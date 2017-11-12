// Import react & CSS
import React from 'react'
import './TrackList.css'

// Import Components
import Track from '../Track/Track.js'

class TrackList extends React.Component {
  // Render Constructor
  render() {
    return (
      <div className="TrackList">
          {this.props.tracks.map(track => {
            return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />
          })}
      </div>
    )
  }
}

export default TrackList
