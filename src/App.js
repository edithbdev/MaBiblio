import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AddBooks from './containers/AddBooks';
import Homepage from './containers/Homepage';
import SearchBooks from './containers/SearchBooks';
import PageNotFound from './containers/PageNotFound';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/MyLibraryBooks-redux" component={Homepage} />
        <Route path="/myLibrary" component={AddBooks} />
        <Route path="/search" component={SearchBooks} />
        <Route path='*' component={PageNotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
