import * as React from 'react';
import { Segment } from '../layout/segment';
import { Heading } from '../layout/heading';
import { Block } from '../layout/block';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { NameList } from './name-list';

const API_DOCS = 'https://blog.matteskridge.com/apis/name-service/'

const client = new ApolloClient({
  uri: 'https://name-service.wholesometools.com/graphql',
});

export class Names extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Block>
          <Segment>
            <Heading>Random name generator</Heading>
          </Segment>
          <Segment>
            <p>
              Need some randomly generated names? We got you, fam! Here are as many names as you need, randomly generated from US census data. You can
              use them for anything you want, including in books, test data, examples, documentation, or anything else.
              We have an API too.
            </p>
          </Segment>
        </Block>
        <Block>
          <NameList />
        </Block>
        <Block className='borderless'>
          <p>
            Like writing code?{' '}
            <a href={API_DOCS} target='_blank' rel='noopener'>Try the public API.</a>
          </p>
        </Block>
      </ApolloProvider>
    );
  }
}
