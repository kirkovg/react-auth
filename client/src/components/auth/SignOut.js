import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class SignOut extends Component {

  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return (
      <div>
        Sorry to see you go.
      </div>
    );
  }
}

export default connect(null, actions)(SignOut);