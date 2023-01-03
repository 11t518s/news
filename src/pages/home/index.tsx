import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArticleItemContainer from "./_components/articleItemContainer";
import ArticleFilterHeader from "../../components/header/articleFilterHeader";
import { PageRouteEnum } from "../type";
import theme from "../../theme";
import headerImages from "assets/images/router/header";

const Home = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    headerRef.current && setHeaderHeight(headerRef.current.clientHeight);
  }, []);
  return (
    <Container>
      <ArticleFilterHeader route={PageRouteEnum.home} ref={headerRef}>
        <ArticleFilterHeader.Element
          onClick={() => console.log(11)}
          activeColor={theme.color.mainBLue}
          inactiveColor={theme.color.darkGray}
          title={"전체 헤드라인"}
          iconComponent={(color) => (
            <headerImages.headlineComponent color={color} />
          )}
        />
        <ArticleFilterHeader.Element
          onClick={() => console.log(11)}
          activeColor={theme.color.mainBLue}
          inactiveColor={theme.color.darkGray}
          title={"전체 날짜"}
          iconComponent={(color) => (
            <headerImages.calendarComponent color={color} />
          )}
        />

        <ArticleFilterHeader.Element
          onClick={() => console.log(11)}
          activeColor={theme.color.mainBLue}
          inactiveColor={theme.color.darkGray}
          title={"전체 국가"}
        />
      </ArticleFilterHeader>
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
