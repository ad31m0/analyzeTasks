import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link  , useRouteMatch,
  useParams} from "react-router-dom";
import Container from '@material-ui/core/Container';

// route components
import {HomePage} from '/imports/ui/pages/HomePage';
import {ClientsPage} from '/imports/ui/pages/ClientsPage';
import {ClientCreatePage} from '/imports/ui/pages/ClientCreatePage';
import {ClientEditPage} from '/imports/ui/pages/ClientEditPage';
import {ClientViewPage} from '/imports/ui/pages/ClientViewPage';

import {Header} from '/imports/ui/layout/Header';
import {NotFoundPage} from '/imports/ui/pages/NotFoundPage';


export const RenderRoutes = () => (
<Container >
  <Router >
  	<Header/>

    <Switch>
      <Route  exact  path="/">
      	<HomePage/>
      </Route>
      <Route  exact path="/clients">
		<ClientsPage/>
      </Route>
          <Route  exact path="/clients/create">
		<ClientCreatePage/>
      </Route>
      <Route  exact path="/clients/edit/:id">
		<ClientEditPage/>
      </Route>
         <Route  exact path="/clients/view/:id">
		<ClientViewPage/>
      </Route>
    </Switch>
  </Router>
  </Container>
);