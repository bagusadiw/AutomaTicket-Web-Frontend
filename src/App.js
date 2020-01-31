import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import CategoryContainer from './pages/categoryContainer'
import EventDetail from './pages/eventDetail'
import AddEvent from './pages/addEvent'
import Payment from './pages/paymentContainer'
import MyTicket from './pages/myTicketContainer'
import Profile from './pages/profile'

class App extends Component{ 
  render(){
    return (
      <div>
        <Router basename="/AutomaTicket-Web-Frontend">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/category/:id/events" component={CategoryContainer} />
            <Route exact path="/event/:id" component={EventDetail} />
            <Route exact path="/add-event" component={AddEvent} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/my-ticket" component={MyTicket} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
