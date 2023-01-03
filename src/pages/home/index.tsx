import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArticleItemContainer from "./_components/articleItemContainer";
import ArticleFilterHeader from "../../components/header/articleFilterHeader";
import { PageRouteEnum } from "../type";
import theme from "../../theme";
import headerImages from "assets/images/router/header";
import ArticleFilterModal from "../../components/custom/articleFilterModal";
import { RootState } from "../../stores";
import { useSelector } from "react-redux";
import { convertDateForFilterHeader } from "../../utils/time";

const Home = () => {
  const { pubDate, headline, countries } = useSelector(
    (state: RootState) => state.articleFilter
  );

  const headerRef = useRef<HTMLDivElement>(null);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const headlineText = headline ? headline : "전체 헤드라인";
  const pubDateText = pubDate
    ? convertDateForFilterHeader(pubDate)
    : "전체 날짜";
  const countriesText =
    countries.length >= 2
      ? `${countries[0].displayName} 외 ${countries.length - 1}개`
      : countries.length >= 1
      ? `${countries[0].displayName}`
      : "전체 국가";

  useLayoutEffect(() => {
    headerRef.current && setHeaderHeight(headerRef.current.clientHeight);
  }, []);
  return (
    <Container>
      <ArticleFilterHeader
        activeColor={theme.color.mainBLue}
        inactiveColor={theme.color.darkGray}
        route={PageRouteEnum.home}
        ref={headerRef}
      >
        <ArticleFilterHeader.Element
          onClick={openModal}
          isActive={!!headline}
          title={headlineText}
          iconComponent={(color) => (
            <headerImages.headlineComponent color={color} />
          )}
        />
        <ArticleFilterHeader.Element
          onClick={openModal}
          isActive={!!pubDate}
          title={pubDateText}
          iconComponent={(color) => (
            <headerImages.calendarComponent color={color} />
          )}
        />

        <ArticleFilterHeader.Element
          onClick={openModal}
          isActive={countries.length > 0}
          title={countriesText}
        />
      </ArticleFilterHeader>
      <ContentContainer excludeHeight={headerHeight}>
        <ArticleItemContainer />
      </ContentContainer>
      <ArticleFilterModal
        isModal={isModal}
        setIsModal={setIsModal}
        headline={headline}
        pubDate={pubDate}
        countries={countries}
      />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 375px;
`;

const ContentContainer = styled.div<{ excludeHeight: number }>`
  padding-top: ${({ excludeHeight }) => `${excludeHeight}px`};
  height: ${({ excludeHeight }) => `calc(100% - ${excludeHeight}px)`};
`;
