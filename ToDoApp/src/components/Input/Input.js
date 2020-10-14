import React from 'react';

import './Input.css';

export default class Input extends React.Component {

  styleInput = 'input-text';
  styleDate = 'input-date';

  state = {
    date: '',
    label: '',
  };

  onInputChange = (event) => {
    this.styleInput = 'input-text';
    this.setState({
      label: event.target.value
    });
  };

  onDateChange = (event) => {
    this.styleDate = 'input-date';
    this.setState({
      date: event.target.value
    });
  };

  checkInput() {
    if(this.state.date && this.state.label) {
      this.props.addItem(this.state.date, this.state.label);
      this.setState({
        date: '',
        label: ''
      });
    };

    if(this.state.date) {
      this.setState({
        label: ''
      });
    };

    if(this.state.label) {
      this.setState({
        date: ''
      });
    };
  };

  checkStyle() {
    if(this.state.date) {
      this.styleInput += ' blur';
    };

    if(this.state.label) {
      this.styleDate += ' blur';
    };

    if(this.state.label && this.state.date) {
      this.styleInput = 'input-text';
      this.styleDate = 'input-date';
    };
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.checkInput();
    this.checkStyle();
  };

  render() {
    return (
      <form 
        className='footer'
        onSubmit={this.onSubmit}>
        <input
          className={this.styleInput}
          placeholder='What should you do...'
          type='text'
          onChange={this.onInputChange}
          value={this.state.label} />
        <input 
          className={this.styleDate}
          type='date'
          onChange={this.onDateChange}
          value={this.state.date} />
        <button className='input-submit'>
          Add
        </button>
      </form>
    );
  };
};