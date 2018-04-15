import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserAction from '../actions/userActions';
import Navbar from './Navbar';
import history from '../index';

import brand from '../assets/icons/brand.png';

/**
 * Has the discover navbar styles
 * @param{undefined}
 * @return{React.Component}
 */
class DiscoverNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logoutUser = () => {
    // Remove user details in localStorage.
    localStorage.setItem('user.token', 'undefined');
    localStorage.setItem('user.admin', 'undefined');

    // Remove all session data.
    this.props.logoutUser();

    // Change page.
    history.push('/');
  }

  render() {
    return (
      <Navbar classNameName="io-navbar io-fixed-top">
        <Link href to="/" className="io-brand">
          <div className="io-text">EventsManagerIO</div>
          <img alt="" src={brand} className="io-img" />
        </Link>
        <div className="io-middle">
          <input placeholder="Type keyword here" type="text" className="io-search-bar" />
          <i className="io-search-button fa fa-search" />
        </div>
        <div className="io-end">
          <Link href to="/profile">
            <i className="io-icon fa fa-user" />
            <div className="io-text io-switchable">PROFILE</div>
          </Link>
          <i className="io-icon fa fa-bell" />
          <div className="io-text io-switchable">MESSAGES</div>
          <i className="io-icon fa fa-cog" />
          <div className="io-text io-switchable" onClick={this.logoutUser}>LOGOUT</div>
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  {
    logoutUser: UserAction.logoutUser,
  },
)(DiscoverNavbar);
