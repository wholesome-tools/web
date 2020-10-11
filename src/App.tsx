import React from 'react';
import './App.css';
import { Header } from './layout/header';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Names } from './names/names';
import { Home } from './home/home';
import { Passwords } from './passwords/passwords';
import { Dice } from './dice/dice';
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2729b0',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none'
      }
    }
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/names' component={Names} />
          <Route path='/passwords' component={Passwords} />
          <Route path='/dice' component={Dice} />
          <Route path='' component={Home} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
