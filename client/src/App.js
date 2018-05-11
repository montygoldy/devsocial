import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./Store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import { clearProfile } from "./actions/profileAction";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/widgets/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";

//Check for token
if (localStorage.jwtToken) {
  //Seth auth token header authorization
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(logoutUser());
    //Clear current profile
    store.dispatch(clearProfile());
    //Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/profiles" component={Profiles} />
              <Route path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute path="/edit-profile" component={EditProfile} />
                <PrivateRoute
                  path="/add-experience"
                  component={AddExperience}
                />
                <PrivateRoute path="/add-education" component={AddEducation} />
                <PrivateRoute path="/not-found" component={NotFound} />
              </Switch>
              <Route path="/feed" component={Posts} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
