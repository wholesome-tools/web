import * as React from 'react';
import { Segment } from '../layout/segment';
import { Heading } from '../layout/heading';
import { Block } from '../layout/block';
import { PasswordCreator } from './password-creator';

const API_DOCS = 'https://www.npmjs.com/package/@wholesome/passwords'

export class Passwords extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Block>
          <Segment>
            <Heading>Secure password generator</Heading>
          </Segment>
          <Segment>
            <p>
              Need a password real quick? We just generated one for you in your browser. 
              It should comply with most online password policies, and if it doesn't, you can 
              tweak the generator settings below. 
            </p>
          </Segment>
        </Block>
        <Block>
          <PasswordCreator />
        </Block>
        <Block className='borderless'>
          <p>
            Like javascript?{' '}
            <a href={API_DOCS} target='_blank' rel='noopener'>Try the npm package.</a>
          </p>
        </Block>
      </React.Fragment>
    );
  }
}
