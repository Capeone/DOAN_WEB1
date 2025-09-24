import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/Mycontext';
import cartIcon from '../components/img/cartlogo.jpg';

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="border-bottom inform-container">
        <div className="left-section">
          {this.context.token === '' ? (
            <div>
              <Link to='/login'>Login</Link> | <Link to='/signup'>Sign-up</Link> | <Link to='/active'>Active</Link>
            </div>
          ) : (
            <div>
              Hello <b>{this.context.customer.name}</b> |{' '}
              <Link to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link> |{' '}
              <Link to='/myprofile'>My profile</Link> | <Link to='/myorders'>My orders</Link>
            </div>
          )}
        </div>
        <div className="right-section">
          <Link to='/mycart'>
            <img src={cartIcon} alt="Cart" />
            Giỏ Hàng:  <b>{this.context.mycart.length}</b> 
          </Link>
        </div>
      </div>
    );
  }

  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;
