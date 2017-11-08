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
        accessToken = accessTokenUrl
        const expiresIn = expiresInUrl

        window.setTimeout(() => accessToken = '', expiresIn * 1000)
        window.history.pushState('Access Token', null, '/')
      } else {
        window.location(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`)
      }
    }
  }
}

export default Spotify
