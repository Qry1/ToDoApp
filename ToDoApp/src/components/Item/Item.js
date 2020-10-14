import React from 'react';

import './Item.css'

export default class Item extends React.Component {
  
  render() {

    const { date, label, done, important, onDeleted, onToggleImportant, onToggleDone } = this.props;
    
    let classNames = 'item';

    if(done) {
      classNames += ' done';
    };

    if(important) {
      classNames += ' important';
    }; 

    return (
      <div className={classNames}>
        <div onClick={onToggleDone}>
          <span 
            className='item-date'>
            {date}
          </span>
          <span 
            className='item-text'>
            {label}
          </span>
        </div>
        <div>
          <button 
            className='button-imp'
            onClick={onToggleImportant}>
            !
          </button>
          <button 
            className='button-del'
            onClick={onDeleted}>
            DEL
          </button>
        </div>
      </div>
    );
  };
};