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
      <tr onClick={this.clickRow}>
        {/* <td>{this.props.member._id}</td> */}
        <td>{this.props.member.name}</td>
        <td style={{ textAlign: "center" }}>{this.props.member.callsign}</td>
        <td style={{ textAlign: "center" }}>
          {this.props.member.birthday_date}-{this.props.member.passaway_date}
        </td>
        <td style={{ textAlign: "right" }}>{this.props.member.name_heb}</td>
      </tr>
    );
  }
}

export default withRouter(MembersTableItem);
