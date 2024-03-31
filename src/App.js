import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardAdministrator from "./components/board-administrator.component";
import BoardGuide from "./components/board-guide.component";
import BoardTourist from "./components/board-tourist.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdministratorBoard: false,
      showGuideBoard: false,
      showTouristBoard: false,
      currentUser: undefined,
      userReady: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    // if (user) {
    //   this.setState({
    //     currentUser: user,
    //     showCompanyAdminBoard: user.roles.includes("ROLE_COMPANY_ADMIN"),
    //     showSystemAdminBoard: user.roles.includes("ROLE_SYSTEM_ADMIN"),
    //   });
    // }
    
    if (user) {
      this.setState({
        currentUser: user,
        userReady: true,
        showGuideBoard: user.role === 1,
        showTouristBoard: user.role === 2,
        showAdministratorBoard: user.role === 3
      })
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdministratorBoard: false,
      showGuideBoard: false,
      showTouristBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdministratorBoard, showTouristBoard, showGuideBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/home"} className="navbar-brand">
            TouristGuideApp
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showAdministratorBoard && (
              <li className="nav-item">
                <Link to={"/administrator"} className="nav-link">
                  Administrator Board
                </Link>
              </li>
            )}

            {showTouristBoard && (
              <li className="nav-item">
                <Link to={"/tourist"} className="nav-link">
                  Tourist Board
                </Link>
              </li>
            )}

            {showGuideBoard && (
              <li className="nav-item">
                <Link to={"/guide"} className="nav-link">
                  Guide Board
                </Link>
              </li>
            )}
            
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/administrator" component={BoardAdministrator} />
            <Route path="/guide" component={BoardGuide} />
            <Route path="/tourist" component={BoardTourist} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
