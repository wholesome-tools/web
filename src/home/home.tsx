import * as React from 'react';
import { Block } from '../layout/block';
import { Segment } from '../layout/segment';
import { Heading } from '../layout/heading';
import { ButtonBase } from '@material-ui/core';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const ToolListWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 800px) {
    display: block;

    .toolButton + .toolButton {
      margin-top: 1rem;
    }
  }
`;

const ToolButton = styled.div`
  flex: 0 0 auto;
  width: 30%;
  box-shadow: 0 2px 2px #DDDDDD;

  .buttonBase {
    width: 100%;
    font-size: 2rem;
    height: 8rem;
  }

  @media (max-width: 800px) {
    width: auto;
  }
`;

const TOOLS = [
  {
    path: '/names',
    name: 'Names',
    color: '#9C27B0'
  },
  {
    path: '/dice',
    name: 'Dice',
    color: '#AF2828'
  },
  {
    path: '/passwords',
    name: 'Passwords',
    color: '#2AAD36'
  },
];

export interface HomeProps {
  history: any;
}

class HomeComponent extends React.Component<HomeProps> {
  public render() {
    return (
      <React.Fragment>
        <Block>
          <ToolListWrap>
            {TOOLS.map(tool => (
              <ToolButton className='toolButton' key={tool.path}>
                <ButtonBase className='buttonBase' onClick={() => this.visitLink(tool.path)}>
                  <span style={{ color: tool.color }}>
                    :{tool.name}
                  </span>
                </ButtonBase>
              </ToolButton>
            ))}
          </ToolListWrap>
        </Block>
        <Block className='borderless'>
          <Segment>
            <Heading>
              About this site
            </Heading>
          </Segment>
          <Segment>
            <p>
              Wholesome Tools is a collection of open source browser gadgets for
              when you're busy or bored.
            </p>
          </Segment>
          <Segment>
            <p>
              Our commitment:
            </p>
          </Segment>
          <Segment>
            <ul>
              <li><strong>Free as in freedom</strong> -- our code is available on Github under the GPLv3 license</li>
              <li><strong>No ads</strong> -- we don't sell out your attention or your privacy</li>
              <li><strong>No nonsense</strong> -- our tools are easy to use</li>
              <li><strong>Public APIs</strong> -- when applicable, our APIs are documented and freely available</li>
            </ul>
          </Segment>
          <Segment>
            For news and random musings, visit my blog
            at <a href='https://blog.matteskridge.com' target='_blank' rel='noopener'>blog.matteskridge.com</a>
          </Segment>
        </Block>
      </React.Fragment>
    );
  }

  public visitLink = (link: string) => {
    this.props.history.push(link);
  }
}

export const Home = withRouter(HomeComponent as any) as any;
