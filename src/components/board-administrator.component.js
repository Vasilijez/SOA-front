import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service.js"

export default class BoardAdministrator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
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

    UserService.getAdministratorBoard().then(
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

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}
