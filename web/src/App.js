import React, { useState, useEffect } from 'react'

import { subscribeEvent, startListening, stopListening } from "./Events";

import './App.css'


function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [events, setEvent] = useState([]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
    var updatedList = events
    updatedList = updatedList.filter(function(item){
      return item.event == e.target.value;
    });
    setSearchResults([updatedList]);
  };

  useEffect(() => {
      subscribeEvent((m) => {
        setEvent([ m , ...events]);
      });
  })

  const renderEvents = () => {
    if (searchTerm !== "") {
      return searchResults.map((item, index) => (
        <div key={index}>
          <ul className="list-group mt-1">
            <li className="list-group-item text-left">
              <div className='item'>
                <div className='icon'>
                  <i className='fas fa-check-circle' />
                </div>
                <div className='type'>
                  {item.type}
                </div>
                <div className='event'>
                  {item.event}
                </div>
              </div>
            </li>
          </ul>
        </div>
      ));
    } else if (events.length == 0) {
        return (
          <div>
            <ul className="list-group mt-1">
              <li className="list-group-item text-left">Nothing to show</li>
            </ul>
          </div>
        );
    } else {
      return events.map((message) => (
        <div key={message.messageId}>
          <ul className="list-group mt-1">
            <li className="list-group-item text-left">
              <div className='item'>
                <div className='icon'>
                  <i className='fas fa-check-circle' />
                </div>
                <div className='type'>
                  {message.type}
                </div>
                <div className='event'>
                  {message.event}
                </div>
              </div>

            </li>
          </ul>
        </div>
      ));
    }
  }

  return (
    <div className="App">
      <div className="container">

      <div className="d-flex flex-row bd-highlight">
          <button type="button" className="btn btn-light mt-5 mr-1" onClick={startListening}>Live</button>
          <button type="button" className="btn btn-light mt-5 mr-1" onClick={stopListening}>Pause</button>
          <input className="form-control mt-5" type="text" placeholder="Search.." onChange={handleChange}/>

      </div>
        {renderEvents()}
    </div>
    </div>
  )
}

export default App
