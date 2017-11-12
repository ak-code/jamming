let accessToken
const clientId = '82acbddfbbef479ab14a408cd446bd3d'
const redirectUri = "http://localhost:3000/"

const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken
    } else {
      const accessTokenUrl = window.location.href.match(/access_token=([^&]*)/)
      const expiresInUrl = window.location.href.match(/expires_in=([^&]*)/)

      if(accessTokenUrl && expiresInUrl) {
        accessToken = accessTokenUrl[1]
        const expiresIn = Number(expiresInUrl[1])

        window.setTimeout(() => accessToken = '', expiresIn * 1000)
        window.history.pushState('Access Token', null, '/')
        return accessToken
      } else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
      }
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
      } else {
        return []
      }
    })
  },

  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken()
    const headers = { Authorization: `Bearer ${accessToken}` }
    let userId

    return fetch(`https://api.spotify.com/v1/me`, {
      headers: headers
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(jsonResponse => {
      userId = jsonResponse.id

      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then(jsonResponse => {
        const playlistId = jsonResponse.id
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackURIs})
        })
      })
    })
  }
}

export default Spotify
