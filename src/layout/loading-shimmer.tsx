import * as React from 'react';
import styled from 'styled-components';

export const LoadingShimmerBG = styled.div`
  height: 1rem;
  background-color: #EEEEEE;
`;

export const LoadingShimmer = (props: any) => (
  <LoadingShimmerBG className='loadingShimmer'>
    {props.children}
  </LoadingShimmerBG>
);
