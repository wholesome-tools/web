import * as React from 'react';
import styled from 'styled-components';
import { Container } from './container';
import { Switch, Route, Link } from "react-router-dom";

const HeaderWrap = styled.header`
  padding: 1rem 0;
  box-shadow: 0 2px 2px #EEEEEE;
  border-bottom: 1px solid #DDDDDD;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  font-weight: normal;

  strong {
    font-weight: normal;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const App = styled.strong`
  &.names {
    color: #9C27B0;
  }
  &.passwords {
    color: #2AAD36;
  }
  &.dice {
    color: #AF2828;
  }
`;

export class Header extends React.Component {
  public names = () => <App className='names'>:Names</App>;
  public passwords = () => <App className='passwords'>:Passwords</App>;
  public dice = () => <App className='dice'>:Dice</App>;
  public empty = () => <App className='empty'>:</App>;

  public render() {
    return (
      <HeaderWrap>
        <Container>
          <Logo>
            <Link to='/'>
              Wholesome
              <Switch>
                <Route path='/names' component={this.names} />
                <Route path='/passwords' component={this.passwords} />
                <Route path='/dice' component={this.dice} />
                <Route path='' component={this.empty} />
              </Switch>
            </Link>
          </Logo>
        </Container>
      </HeaderWrap>
    );
  }
}
