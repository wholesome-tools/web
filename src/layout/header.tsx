import * as React from 'react';
import styled from 'styled-components';
import { Container } from './container';
import { Switch, Route, Link } from "react-router-dom";
import { Button } from '@material-ui/core';

const HeaderWrap = styled.header`
  padding: 1rem 0;
  box-shadow: 0 2px 2px #EEEEEE;
  border-bottom: 1px solid #DDDDDD;
`;

const HeaderInner = styled.div`
  display: flex;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  font-weight: normal;
  flex: 1;

  strong {
    font-weight: normal;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Links = styled.div`
  img {
    width: 20px;
    height: 20px;
  }
  .nomobile {
    margin-left: 15px;
    display: inline-block;
  }
  @media (max-width: 800px) {
    .nomobile {
      display: none;
    }
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
          <HeaderInner>
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
            <Links>
              <Button size='small' onClick={this.onGithubClick}><img alt="Github" src="/images/GitHub-Mark-32px.png" /><span className="nomobile">Github</span></Button>
            </Links>
          </HeaderInner>
        </Container>
      </HeaderWrap>
    );
  }

  public onGithubClick = () => {
    window.open('https://github.com/wholesome-tools/web');
  }
}
