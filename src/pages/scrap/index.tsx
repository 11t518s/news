import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "stores";
import { ArticleFilterStore } from "stores/articleFilter/type";
import { scrapArticleFilterActions } from "stores/scrapArticleFilter";
import { scrapArticleActions } from "stores/scrapArticle";

import ArticleFilterHeader from "components/custom/articleFilterHeader";
import ArticleItemContainer from "components/custom/article";
import ArticleFilterModal from "components/custom/articleFilterModal";

const ScrapPage = () => {
  const dispatch = useDispatch();

  const { data: scrapArticles, isLoading } = useSelector(
    (state: RootState) => state.scrapArticle
  );
  const scrapArticleFilter = useSelector(
    (state: RootState) => state.scrapArticleFilter
  );
  const { pubDate, headline, countries } = scrapArticleFilter;

  const headerRef = useRef<HTMLDivElement>(null);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const openModal = () => {
    setIsModal(true);
  };

  const handleFilterChange = (filter: Omit<ArticleFilterStore, "page">) => {
    dispatch(scrapArticleFilterActions.updateArticleFilter(filter));
    dispatch(scrapArticleActions.requestData(filter));
  };

  const handleGetArticle = () => {
    dispatch(scrapArticleActions.requestData(scrapArticleFilter));
  };

  useLayoutEffect(() => {
    headerRef.current && setHeaderHeight(headerRef.current.clientHeight);
  }, []);

  return (
    <Container>
      <ArticleFilterHeader
        onClick={openModal}
        pubDate={pubDate}
        headline={headline}
        countries={countries}
        ref={headerRef}
      />

      <ContentContainer excludeHeight={headerHeight}>
        <ArticleItemContainer
          isLoading={isLoading}
          articles={scrapArticles}
          getArticle={handleGetArticle}
          emptyTitle={"스크랩된 데이터가 없습니다."}
        />
      </ContentContainer>

      <ArticleFilterModal
        isModal={isModal}
        setIsModal={setIsModal}
        headline={headline}
        pubDate={pubDate}
        countries={countries}
        onFilterChange={handleFilterChange}
      />
    </Container>
  );
};

export default ScrapPage;

const Container = styled.div`
  width: 375px;
`;

const ContentContainer = styled.div<{ excludeHeight: number }>`
  padding-top: ${({ excludeHeight }) => `${excludeHeight}px`};
  height: ${({ excludeHeight }) => `calc(100% - ${excludeHeight}px)`};
`;
