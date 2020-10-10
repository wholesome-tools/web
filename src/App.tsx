import React from 'react';
import './App.css';
import { Header } from './layout/header';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Names } from './names/names';
import { Home } from './home/home';
import { Passwords } from './passwords/passwords';
import { Dice } from './dice/dice';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/names' component={Names} />
        <Route path='/passwords' component={Passwords} />
        <Route path='/dice' component={Dice} />
        <Route path='' component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
