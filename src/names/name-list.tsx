import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import * as _ from 'lodash';
import { LoadingShimmer } from "../layout/loading-shimmer";

const NameListWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  div:nth-child(3n+2) {
    text-align: center;
  }

  div:nth-child(3n+3) {
    text-align: right;
  }

  @media (max-width: 800px) {
    display: block;
    div {
      text-align: left !important;
    }
  }
`;

const NameItem = styled.div`
  flex: 0 0 auto;
  width: 33%;
  font-size: 1.5rem;
  line-height: 3rem;

  .loadingShimmer {
    height: 1.5rem;
    width: 70%;
    display: inline-block;
  }

  @media (max-width: 800px) {
    width: auto;
  }
`;

export function NameList() {
  const query = gql`
    {
      names(count: 12) {
        full
      }
    }
  `;

  const { loading, error, data } = useQuery(query);

  if (loading) {
    return (
      <NameListWrap>
        {_.times(12, () => <NameItem><LoadingShimmer /></NameItem>)}
      </NameListWrap>
    )
  }

  if (data && data.names) {
    return (
      <NameListWrap>
        {data.names.map((item: any, idx: number) => (
          <NameItem key={idx}>
            {item.full}
          </NameItem>
        ))}
      </NameListWrap>
    );
  }

  return null;
}
