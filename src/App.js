import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './component/home/home'
import CategoryContainer from './component/category/categoryContainer'
import EventDetail from './component/event/eventDetail'
import SignIn from './component/sign/signIn'
import SignUp from './component/sign/signUp'
import AddEvent from './component/event/addEvent'
import Payment from './component/payment/paymentContainer'
import MyTicket from './component/myTicket/myTicketContainer'
import Profile from './component/profile/profile'

class App extends Component{ 
  render(){
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/category/:id/events" component={CategoryContainer} />
            <Route exact path="/event/:id" component={EventDetail} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/add-event" component={AddEvent} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/my-ticket" component={MyTicket} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
