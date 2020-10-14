import React from 'react';

import Item from '../Item/Item'

import './List.css'

export default class List extends React.Component {

  render() {

    const { data, onDeleted, onToggleImportant, onToggleDone } = this.props;
    
    const elements = data.map((item) => {
      const { id, ...restProps } = item;
  
      return (
        <li key={id}>
          <Item 
            { ...restProps } 
            onDeleted={() => onDeleted(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleDone={() => onToggleDone(id)}/>
        </li>
      );
    });
  
    return (
      <ul 
        className='list'>
        {elements}
      </ul>
    );
  };
};