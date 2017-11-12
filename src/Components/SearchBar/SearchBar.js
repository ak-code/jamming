// Import react & CSS
import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    // Sets initial state
    this.state = {
      term: ''
    }

    // Binds methods to `this`
    this.search = this.search.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
  }

  // Handles onSearch event
  search() {
    this.props.onSearch(this.state.term)
  }

  // Handles change in term
  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  // Render Constructor
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.search} >SEARCH</a>
      </div>
    )
  }
}

export default SearchBar
