import React from 'react';

import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import List from '../List/List';
import Input from '../Input/Input';

import './App.css';

export default class App extends React.Component {

  maxId = 100;

  state = {
    data: JSON.parse(localStorage.getItem('todo')) || [],
    terms: ''
  };

  createItem(date, label) {
    return {
      date,
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  };

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);

      const newData = [...data.slice(0, index), ...data.slice(index + 1)];
      localStorage.setItem('todo', JSON.stringify(newData));

      return {
        data: JSON.parse(localStorage.getItem('todo'))
      };
    });
  };

  addItem = (date, text) => {
    const newItem = this.createItem(date, text)

    this.setState(({ data }) => {
      const newData = [...data, newItem];
      localStorage.setItem('todo', JSON.stringify(newData));

      return {
        data: JSON.parse(localStorage.getItem('todo'))
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const oldItem = data[index];
      const newItem = {...oldItem, important: !oldItem.important};

      const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
      localStorage.setItem('todo', JSON.stringify(newData));

      return {
        data: JSON.parse(localStorage.getItem('todo'))
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const oldItem = data[index];
      const newItem = {...oldItem, done: !oldItem.done};

      const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
      localStorage.setItem('todo', JSON.stringify(newData));

      return {
        data: JSON.parse(localStorage.getItem('todo'))
      };
    });
  };

  onSearch = (terms) => {
    this.setState({
      terms
    });
  };

  search(items, terms) {
    if(terms.length === 0) {
      return items;
    };
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(terms.toLowerCase()) > -1;
    });
  };

  sortByName = () => {
    this.setState(({ data }) => {
      const newData = data.sort((a, b) => (a.label.toLowerCase() > b.label.toLowerCase()) ? 1 : -1);
      localStorage.setItem('todo', JSON.stringify(newData));

      return {
        data: JSON.parse(localStorage.getItem('todo'))
      };
    });
  };

  sortByDate = () => {
    this.setState(({ data }) => {
      const newData = data.sort((a, b) => (a.date > b.date) ? 1 : -1);
      localStorage.setItem('todo', JSON.stringify(newData));

      return {
        data: JSON.parse(localStorage.getItem('todo'))
      };
    });
  };

  pickDate = (date) => {
    this.setState(({ data }) => {
      const newData = data.filter((a) => a.date === date );
      localStorage.setItem('todo', JSON.stringify(newData));

      return {
        data: JSON.parse(localStorage.getItem('todo'))
      };
    });
  };

  render() {
    
    const searchedData = this.search(this.state.data, this.state.terms);

    return (
      <div className='app'>
        <Header />
        <Menu 
          onSearch={this.onSearch}
          sortByName={this.sortByName}
          sortByDate={this.sortByDate}
          pickDate={this.pickDate} />
        <List 
          data={searchedData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <Input addItem={this.addItem}/>
      </div>
    );
  };
};

