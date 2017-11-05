import React from 'react'
import './App.css'

import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js'
import Playlist from '../Playlist/Playlist.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: [
        {id: '1', name: 'name1', artist: 'artist1', album: 'album1'},
        {id: '2', name: 'name2', artist: 'artist2', album: 'album2'},
        {id: '3', name: 'name3', artist: 'artist3', album: 'album3'}
      ],
      playlistName: 'playlist1',
      playlistTracks: [
        {id: '4', name: 'name4', artist: 'artist4', album: 'album4'}
      ]
    }

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
  }

  addTrack(track) {
     let tracks = this.state.playlistTracks
     if (!tracks.includes(track)) {
       tracks.push(track)
       this.setState({playlistTracks: tracks})
     }
   }

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

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.uri
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
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
