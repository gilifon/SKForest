import React, { Component } from "react";
import "./AdminDashboard.css";

export class AdminDashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <div className="card mb-3 widget-chart">
            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg bg-info" />
              <i className="fas fa-cog text-dark" />
            </div>
            <div className="widget-numbers">4687</div>
            <div className="widget-subheading">Views</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3 widget-chart">
            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg bg-dark" />
              <i className="fas fa-user text-dark" />
            </div>
            <div className="widget-numbers">14</div>
            <div className="widget-subheading">SK members</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3 widget-chart">
            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg bg-success" />
              <i className="fas fa-user-plus text-dark" />
            </div>
            <div className="widget-numbers">2</div>
            <div className="widget-subheading">Addition Requests</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3 widget-chart">
            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg bg-danger" />
              <i className="fas fa-user-edit text-dark" />
            </div>
            <div className="widget-numbers">1</div>
            <div className="widget-subheading">Update Requests</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
