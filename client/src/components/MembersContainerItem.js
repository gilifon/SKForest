import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../Item.css";

class MembersTableItem extends Component {
  clickRow = () => {
    this.props.history.push({
      pathname: "/profile/" + this.props.member.callsign
    });
  };

  render() {
    return (
      // <tr onClick={this.clickRow}>
      //   <td>{this.props.member.name}</td>
      //   <td style={{ textAlign: "center" }}>{this.props.member.callsign}</td>
      //   <td style={{ textAlign: "center" }}>
      //     {this.props.member.birthday_date}-{this.props.member.passaway_date}
      //   </td>
      //   <td style={{ textAlign: "right" }}>{this.props.member.name_heb}</td>
      // </tr>
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
        <div className="jumbotron memberItem">
          <div className="row">
            <div className="col-4 text-left itemName">
              <div>{this.props.member.name}</div>
            </div>
            <div className="col-4 text-center itemCall">
              <div>{this.props.member.callsign}</div>
            </div>
            <div className="col-4 text-right itemName">
              <div>{this.props.member.name_heb}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              {this.props.member.birthday_date}-
              {this.props.member.passaway_date}
            </div>
          </div>
          <hr className="my-2" />
          <div
            className="btn btn-lg btn-outline-dark"
            href="#"
            role="button"
            onClick={this.clickRow}
          >
            לקריאה נוספת
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MembersTableItem);
