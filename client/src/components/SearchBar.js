import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { withRouter, Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import "./SearchBar.css";

class SearchBar extends Component {
  state = {
    searchCallsign: "",
    isLoading: false,
    authenticated: null
  };

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  };

  componentDidMount() {
    this.checkAuthentication();
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  login = async event => {
    this.props.auth.login("/admin/dashboard");
  };
  logout = async event => {
    this.props.auth.logout("/");
  };

  handleChange = event => {
    this.setState({ searchCallsign: event.target.value });
  };
  handleKeyPress = event => {
    if (event.charCode === 13) {
      event.preventDefault();
      this.handleSubmit(event);
    }
  };
  handleSubmit = event => {
    this.setState({ isLoading: true }, () => {
      this.props.onSearch(this.state.searchCallsign).then(() => {
        this.props.history.push({
          pathname: "/members/"
        });
        this.setState({ isLoading: false });
      });
    });
  };

  render() {
    const isLoading = this.state.isLoading;
    const loggedIn = (
      <React.Fragment>
        <Link to="/admin/dashboard" className="App-link text-right">
          ניהול
        </Link>
        <div className="App-link text-right" onClick={this.logout}>
          התנתק
        </div>
      </React.Fragment>
    );
    const loggedOut = (
      <div className="App-link text-right" onClick={this.login}>
        התחבר
      </div>
    );

    return (
      <React.Fragment>
        <Navbar className="navbar navbarStyle">
          <Nav className="mr-auto">
            {this.state.authenticated ? loggedIn : loggedOut}
            <Link to="/members" className="App-link text-right">
              קיר זיכרון
            </Link>
            <Link to="/" className="App-link text-right">
              ראשי
            </Link>
          </Nav>
          <Form inline>
            <Row>
              <Col xs={7} md={6}>
                <FormControl
                  type="text"
                  placeholder="חפש"
                  className="narrow pull-left"
                  value={this.state.searchCallsign}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                />
              </Col>
              <Col xs={5} md={6}>
                <div
                  variant="outline-info"
                  className="App-link pull-right"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handleSubmit : null}
                >
                  {isLoading && <i className="fas fa-sync-alt fa-spin" />}{" "}
                  {isLoading ? <span>מחפש</span> : <span>חפש</span>}
                </div>
              </Col>
            </Row>
          </Form>
        </Navbar>
        {/* {!this.state.authenticated && (
          <div className="quote d-none d-sm-block">
            <Container>
              <Row>
                <Col className="text-left">יהודה עמיחי~</Col>
                <Col md="auto">
                  כל אדם הוא סכר בין עבר ועתיד. כשהוא מת נשבר הסכר והעבר מתפרץ
                  לתוך העתיד
                </Col>
              </Row>
            </Container>
          </div>
        )} */}
      </React.Fragment>
    );
  }
}

export default withAuth(withRouter(SearchBar));
