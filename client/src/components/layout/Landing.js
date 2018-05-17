import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Video from "../img/video/Home_work.mp4";
class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing-wrapper">
        <div className="video-container">
          <video loop autoPlay muted>
            <source src={Video} type="video/mp4" />Your browser does not support
            the video tag. I suggest you upgrade your browser.
          </video>
        </div>
        <div className="masthead">
          <div className="masthead-bg" />
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-12 my-auto">
                <div className="masthead-content text-white py-5 py-md-0">
                  <h1 className="mb-3">Coder Networking !</h1>
                  <p className="mb-3">
                    Create a developer profile/portfolio, share posts and get
                    help from other developers. Sign up now
                  </p>
                  <Link
                    to="/register"
                    className="main-btn btn btn-lg btn-info mr-2"
                  >
                    Register Now!
                  </Link>
                  <Link to="/login" className="main-btn btn btn-lg btn-light">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Landing);
