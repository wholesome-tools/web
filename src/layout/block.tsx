import styled from 'styled-components';
import { Container } from './container';
import React from 'react';

export const BlockWrap = styled.div`
  border-bottom: 1px solid #DDDDDD;
  padding: 1.5rem 0;

  &.borderless {
    border-bottom: none;
  }
`;

export const Block = (props: any) => (
  <BlockWrap className={props.className || ''}>
    <Container>
      {props.children}
    </Container>
  </BlockWrap>
)
