import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, withRouter, IndexRoute, Link } from 'react-router';

import Login from './Login.jsx/index.js';
import Requests from './Requests.jsx';

var contentNode = document.getElementById("contents");

// A simple component to indicate that a page was not found.
const NoMatch = () => <p>Page Not Found</p>;

// This defines the main application layout that can be used
// across nested routes. The `props.children` property is received
// by the parent route. See the route definitions below.
const App = (props) => (
  <div>
    <div className="header">
      <h1>EZ-Lease</h1>
      <p><Link to="/">Logout</Link></p>
    </div>
    <div className="contents">
      {props.children}
    </div>
  </div >
);

// For safety, we specify that the prop types received by the
// App component must require a "children" property. If we do
// not include this it will not compile.
App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

// The "routed app" that defines the different routes that
// are supposed in this application. As you can see, If the
// URL path is '/' we will render the IssueList component,
// if the path is '/issues/:id' we render the IssueEdit component,
// and if we get anything else we render the NoMatch view.
// This router uses the "hash history" approach to implement
// single-page apps with multiple views.
const RoutedApp = () => (
  <Router history={hashHistory} >
    {/* <Redirect from="/" to="/requests" /> */}
    <Route path="/" component={App} >
      <IndexRoute component={Requests} />
      <Route path="/requests" component={withRouter(Requests)} />
      <Route path="/requests/:id" component={Requests} />
      <Route path="/login" component={Login} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>);

// This renders the JSX router inside the content node:
ReactDOM.render(<RoutedApp />, contentNode);