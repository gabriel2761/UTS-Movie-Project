import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Logout extends React.Component {
  constructor() {
	super();
	localStorage.removeItem('token');
  }

  render() {
	return (<Redirect to="/login"/>);
  }
}

export default Logout;
