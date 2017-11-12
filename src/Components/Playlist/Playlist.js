// Import react & CSS
import React from 'react'
import './Playlist.css'

// Imports Components
import TrackList from '../TrackList/TrackList.js'

class Playlist extends React.Component {
  constructor(props) {
    super(props)

    // Binds methods to `this`
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  // Handles change in playlist name
  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }

  // Render Constructor
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange} />
          <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist
