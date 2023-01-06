import React from "react";
import styled, { keyframes } from "styled-components";

import { BottomElement, Container, TopElement } from "./articleItem";

const ArticleItemSkeleton = () => {
  return (
    <Container>
      <TopElementSkeleton />
      <BottomElementSkeleton />
    </Container>
  );
};

export default ArticleItemSkeleton;

const BackgroundColorAnimation = (props: any) => keyframes`
  from {
    background-color: ${props.theme.color.gray};
  }
  50% {
    background-color: ${props.theme.color.darkGray};
    opacity: 0.3;
  }
  to {
    background-color: ${props.theme.color.gray};
  }
`;

const TopElementSkeleton = styled(TopElement)`
  animation: ${BackgroundColorAnimation} 1s infinite;
  background-color: ${({ theme }) => theme.color.gray};
  width: 200px;
  height: 25px;
  border-radius: 5px;
`;
const BottomElementSkeleton = styled(BottomElement)`
  animation: ${BackgroundColorAnimation} 1s infinite;
  margin-top: 15px;
  background-color: ${({ theme }) => theme.color.gray};
  width: 150px;
  height: 20px;
  border-radius: 5px;
`;
