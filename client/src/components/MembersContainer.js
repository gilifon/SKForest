import React, { Component } from "react";
import MembersContainerItem from "./MembersContainerItem";

class MembersTable extends Component {
  render() {
    return (
      <div className="brickWall">
        <div className="row">
          {this.props.memberlist.map(item => (
            <MembersContainerItem key={item._id} member={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default MembersTable;
