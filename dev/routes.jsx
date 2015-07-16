import { Route, DefaultRoute } from "react-router";
import React from "react";

import App from "./public/views/app";
import Account from "./public/views/account";
import Users from "./public/views/users";
export default (
  <Route path='/' handler={App}>
    <DefaultRoute name='account' handler={Account}/>
		<Route name='users' handler={Users}/>    
  </Route>
);