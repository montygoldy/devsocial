import React, { Component } from "react";
import isEmpty from "../../validations/isEmpty";
import PropTypes from "prop-types";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //get first name
    const firstName = profile.user.name.trim().split(" ")[0];
    //Skill List
    const skillList = profile.skills.map((skill, i) => (
      <div key={i} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead text-center">
              {isEmpty(profile.bio) ? (
                <span>()</span>
              ) : (
                <span>{firstName} doesn't have a bio</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div
                className="d-flex flex-wrap justify-content-center align-items-center skill-list-div"
                style={{ width: "100%" }}
              >
                {skillList}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
