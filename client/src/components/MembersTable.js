import React, { Component } from "react";
import MembersTableItem from "./MembersTableItem";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

class MembersTable extends Component {
  render() {
    return (
      <Container>
        <Table striped bordered hover variant="dark">
          {/* <thead>
            <tr>
              <th>Name</th>
              <th>Callsign</th>
              <th />
            </tr>
          </thead> */}
          <tbody>
            {this.props.memberlist.map(item => (
              <MembersTableItem key={item._id} member={item} />
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default MembersTable;
