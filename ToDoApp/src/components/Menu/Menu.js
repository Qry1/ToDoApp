import React from 'react';

import './Menu.css'

export default class Menu extends React.Component {

  state = {
    term: '',
    date: ''
  }

  onSearch = (event) => {
    const term = event.target.value;
    this.setState({
      term
    });
    this.props.onSearch(term);
  };

  onDateChange = (event) => {
    this.setState({
      date: event.target.value
    }, () => this.props.pickDate(this.state.date))
  }

  render() {

    const { sortByName, sortByDate } = this.props;

    return (
      <div className='menu'>
        <input
          placeholder='Search'
          className='input-sort'
          type='text'
          value={this.state.term}
          onChange={this.onSearch} />
        <button 
          className='sort'
          onClick={sortByName}>
          Sort by name
        </button>
        <button 
          className='sort'
          onClick={sortByDate}>
          Sort by date
        </button>
        <input 
          className='input-date'
          type='date'
          onChange={this.onDateChange} />
      </div>
    );
  };
};