import './App.css';
import React from 'react';
import Header from './components/header'
import Message from './components/Message'
class Chatbot extends React.Component {
  render()
  {
    return (
      <div className='App'>
        <Header/>
        <Message />
      </div>
    )
  }
}

export default Chatbot;
