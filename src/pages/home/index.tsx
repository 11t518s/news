import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArticleItemContainer from "./_components/articleItemContainer";
import Header from "./_components/header";

const Home = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    headerRef.current && setHeaderHeight(headerRef.current.clientHeight);
  }, []);
  return (
    <Container>
      <Header ref={headerRef} />
      <ContentContainer excludeHeight={headerHeight}>
        <ArticleItemContainer />
      </ContentContainer>
    </Container>
  );
};

export default Home;

const Container = styled.div``;

const ContentContainer = styled.div<{ excludeHeight: number }>`
  padding-top: ${({ excludeHeight }) => `${excludeHeight}px`};
  height: ${({ excludeHeight }) => `calc(100% - ${excludeHeight}px)`};
`;
