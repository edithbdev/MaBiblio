import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AddBooks from './containers/AddBooks';
import SearchBooks from './containers/SearchBooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={AddBooks} />
        <Route path="/search" component={SearchBooks} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
