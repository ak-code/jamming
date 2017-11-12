// Import react & CSS
import React from 'react'
import './App.css'

// Import Components
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js'
import Playlist from '../Playlist/Playlist.js'
import Spotify from '../../util/Spotify.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    // Set initial state
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }

    // Binds methods to `this`
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  // Add tracks to playlist
  addTrack(track) {
     let tracks = this.state.playlistTracks
     if (!tracks.includes(track)) {
       tracks.push(track)
       this.setState({playlistTracks: tracks})
     }
   }

   // Removes tracks from playlist
  removeTrack(track) {
    let tracks = this.state.playlistTracks
    if (tracks.includes(track)) {
      let id = tracks.indexOf(track)
      tracks.splice(id, 1)
      this.setState({
        playlistTracks: tracks
      })
    }
  }

  // Updates name of playlist
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  // Saves playlist to Spotify
  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  // Handles search results from Spotify
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      })
    })
  }

  // Render Constructor
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
