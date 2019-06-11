import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
// import MembersTable from "./MembersTable";
import MembersContainer from "./MembersContainer";
import MemberProfile from "./MemberProfile";
import HomePage from "./HomePage";
import Login from "./auth/Login";
import AdminDashboard from "./admin/AdminDashboard";
import { SecureRoute, ImplicitCallback } from "@okta/okta-react";

export class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact render={props => <HomePage />} />
        <Route
          path="/members"
          exact
          // render={props => <MembersTable memberlist={this.props.memberlist} />}
          render={props => (
            <MembersContainer memberlist={this.props.memberlist} />
          )}
        />
        <Route
          path="/profile/:callsign/"
          render={props => (
            <MemberProfile callsign={props.match.params.callsign} />
          )}
        />
        <SecureRoute path="/admin/dashboard/" component={AdminDashboard} />
        <Route
          path="/admin/login/"
          render={() => <Login baseUrl="https://dev-804283.okta.com" />}
        />
        <Route path={"/implicit/callback/"} component={ImplicitCallback} />
      </Switch>
    );
  }
}

export default Main;
