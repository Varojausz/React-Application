import React, { createFactory, useState } from 'react';
import './App.scss';
import Form from './reusableComponents/Form';
import PaginatedForm from './reusableComponents/PaginatedForm';
import InfiniteForm from './reusableComponents/InfiniteForm';
/* import Fetching from './chapters/Fetching'; */
import { LayoutHeaderFooter2Sidebars } from './reusableComponents/Layouts';
/* import {Div1 as Div2} from './CSS/StyledComponents' */
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

/*       <Navbar/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/favorites" component={Favorites}/>
        <Route exact path="/misnotas" component={MisNotas}/>
        <Route exact path="/task/:id" component={TaskDetail}/>
        <Route exact path="/edittask/:id" component={EditTask}/> */





function App() {
  return (
  <Router>
      <Switch>
        <LayoutHeaderFooter2Sidebars headerHeight='2rem'>
          <Route exact path="/" component={PaginatedForm}/>
          <Route exact path="/form" component={Form}/>
          <Route exact path="/infiniteform" component={InfiniteForm}/>
        </LayoutHeaderFooter2Sidebars>
      </Switch>
  </Router>
  
  )
}

export default App;
