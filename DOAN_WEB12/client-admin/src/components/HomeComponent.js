import React, { Component } from 'react';
import logo from '../components/img/logo.png';

class Home extends Component {
  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">ADMIN HOME</h2>
        <img src={logo} alt="Logo" className="logo" />
      </div>
    );
  }
}
export default Home;
