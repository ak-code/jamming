// Declare variables
let accessToken
const clientId = '82acbddfbbef479ab14a408cd446bd3d'
const redirectUri = "http://localhost:3000/"

const Spotify = {
  // Get access token form Spotify
  getAccessToken() {
    // Determines if access token is already set
    if(accessToken) {
      return accessToken
    } else {
      // Gets access token & expires in from href
      const accessTokenUrl = window.location.href.match(/access_token=([^&]*)/)
      const expiresInUrl = window.location.href.match(/expires_in=([^&]*)/)

      // Determines if accessTokenUrl & expiresInUrl are already set
      if(accessTokenUrl && expiresInUrl) {
        accessToken = accessTokenUrl[1]
        const expiresIn = Number(expiresInUrl[1])

        window.setTimeout(() => accessToken = '', expiresIn * 1000)
        window.history.pushState('Access Token', null, '/')
        return accessToken
      } else {
        // Redirect to Spotify login
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
      }
    }
  },

  // Gets search results form Spotify
  search(term) {
    // Get access token
    const accessToken = Spotify.getAccessToken()

    // Send GET request to Spotify for search results
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      // Converts response in to JSON
      if (response.ok) {
        return response.json()
      }
    }).then(jsonResponse => {
      // Determines if jsonResponse has tracks
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

  // Posts playlist to Spotify
  savePlaylist(name, trackURIs) {
    // Determines if name & trackURIs are set
    if (!name || !trackURIs.length) {
      return;
    }

    // Gets access token
    const accessToken = Spotify.getAccessToken()
    const headers = { Authorization: `Bearer ${accessToken}` }
    let userId

    // Sends GET request for userId
    return fetch(`https://api.spotify.com/v1/me`, {
      headers: headers
    }).then(response => {
      // Converts response in to JSON
      if (response.ok) {
        return response.json()
      }
    }).then(jsonResponse => {
      // Sets userId
      userId = jsonResponse.id

      // Sends POST request to set playlist in Spotify
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => {
        // Converts response in to JSON
        if (response.ok) {
          return response.json()
        }
      }).then(jsonResponse => {
        // Sets playlistId
        const playlistId = jsonResponse.id
        // Sends POST request to set tracks to playlist in Spotify
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
