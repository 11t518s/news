import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "stores";
import { articleFilterActions, ArticleFilterStore } from "stores/articleFilter";
import { articleActions } from "stores/article";

import ArticleFilterHeader from "components/custom/articleFilterHeader";
import ArticleItemContainer from "components/custom/article";
import ArticleFilterModal from "components/custom/articleFilterModal";
import ArticleItemSkeleton from "../../components/custom/article/articleItem.skeleton";

const HomePage = () => {
  const dispatch = useDispatch();

  const articleFilter = useSelector((state: RootState) => state.articleFilter);
  const { pubDate, headline, countries } = articleFilter;
  const { data, isLoading } = useSelector((state: RootState) => state.article);

  const headerRef = useRef<HTMLDivElement>(null);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const openModal = () => {
    setIsModal(true);
  };

  const handleFilterChange = (filter: Omit<ArticleFilterStore, "page">) => {
    dispatch(articleFilterActions.updateArticleFilter(filter));
    dispatch(articleActions.resetData());
    dispatch(articleActions.requestData({ ...filter, page: 0 }));
  };

  const handleGetArticle = () => {
    dispatch(articleActions.requestData(articleFilter));
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
          articles={data}
          getArticle={handleGetArticle}
          emptyTitle={"검색된 기사가 없습니다."}
          loadingComponent={<ArticleItemSkeleton />}
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

export default HomePage;

const Container = styled.div`
  width: 375px;
`;

const ContentContainer = styled.div<{ excludeHeight: number }>`
  padding-top: ${({ excludeHeight }) => `${excludeHeight}px`};
  height: ${({ excludeHeight }) => `calc(100% - ${excludeHeight}px)`};
`;
