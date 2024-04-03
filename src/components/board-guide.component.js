import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

export default class BoardGuide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };

    this.updateCompany = this.updateCompany.bind(this);
  }

  componentDidMount() {
    // check if user is logged in
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser || !currentUser.token) {
      this.setState({
        content: "Please log in to view this content."
      });

      return;
    }

    UserService.getGuideBoard().then(
      response => {
        this.setState({
          content: response.data.message
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  updateCompany= async(e) =>{
    e.preventDefault();

    this.props.history.push('/create-blog');
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>

        <button className='btn btn-success' onClick={this.updateCompany}>Create a blog</button>
      </div>
    );
  }
}
