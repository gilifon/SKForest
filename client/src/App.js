import React, { Component } from "react";
import SiteHeader from "./components/SiteHeader";
import SearchBar from "./components/SearchBar";
import Main from "./components/Main";
import API from "./services/API";
import { Security } from "@okta/okta-react";
import "./App.css";

const config = {
  client_id: "0oao4are0ojR8cWtF356",
  issuer: "https://dev-804283.okta.com/oauth2/default",
  redirect_uri: window.location.origin + "/implicit/callback",
  onAuthRequired: ({ history }) => {
    history.push("/admin/login");
  }
};

class App extends Component {
  state = {
    memberlist: [],
    authenticated: null
  };

  FilterList = val => {
    return API.FilterList(val).then(res => this.setState({ memberlist: res }));
  };

  componentDidMount() {
    console.log("APP Mounted..");
    return this.FilterList("");
  }

  render() {
    return (
      <Security {...config}>
        <React.Fragment>
          {!this.state.authenticated && <SiteHeader />}
          <SearchBar onSearch={this.FilterList} />
          <Main memberlist={this.state.memberlist} />
        </React.Fragment>
      </Security>
    );
  }
}
export default App;
