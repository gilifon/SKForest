import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import API from "../services/API";
import "./MemberProfile.css";

export class MemberProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: null,
      isLoaded: false,
      isExist: false
    };
  }

  componentDidMount() {
    console.log("MemberProfile Mounted..");
    API.FilterList("callsign/" + this.props.callsign).then(res => {
      this.setState({ isLoaded: true });
      if (res.length > 0) {
        this.setState({ member: res[0] });
        this.setState({ isExist: true });
      }
    });
  }

  render() {
    let content;

    if (this.state.isLoaded && this.state.isExist) {
      content = (
        <Container style={{ direction: "rtl" }}>
          <Row className="profileHeader">
            <Col xs={6} md={3}>
              {this.state.member.image ? (
                <Image
                  className="memberImage"
                  src={this.state.member.image}
                  rounded
                />
              ) : (
                <i className="fa fa-user ImageIcon" />
              )}
            </Col>
            <Col xs={6} md={9}>
              <p />
              <h1>{this.state.member.callsign}</h1>
              <h2>{this.state.member.name_heb}</h2>
              <h2>{this.state.member.name}</h2>
              <h2>
                {this.state.member.passaway_date} -{" "}
                {this.state.member.birthday_date}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col className="profileBody">
              <p />
              {this.state.member.bio}
              <p />
            </Col>
          </Row>
        </Container>
      );
    } else if (this.state.isLoaded && !this.state.isExist) {
      content = <Container>חובב באות קריאה זה לא נמצא במערכת</Container>;
    }
    return (
      <Container>
        <div className="jumbotron">
          {!this.state.isLoaded && <Spinner animation="border" />}
          {content}
        </div>
      </Container>
    );
  }
}

export default MemberProfile;
