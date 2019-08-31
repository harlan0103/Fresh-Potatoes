import React from 'react';
import Header from './Header';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Boxoffice from './pages/Boxoffice';
import Search from './pages/Search';
import Gallery from './pages/Gallery';
import About from './pages/About';
import MovieDetail from './pages/MovieDetail';

const App = () => {
  return(
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/boxoffice" component={Boxoffice} />
        <Route path="/search" component={Search} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/movie/:id" component={MovieDetail} />
      </BrowserRouter>
    </div>
  );
}

export default App;
