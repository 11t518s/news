import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "stores";
import { articleFilterActions, ArticleFilterStore } from "stores/articleFilter";
import { articleActions } from "stores/article";

import ArticleFilterHeader from "components/custom/articleFilterHeader";
import ArticleItemContainer from "components/custom/article";
import ArticleFilterModal from "components/custom/articleFilterModal";
import ArticleItemSkeleton from "components/custom/article/articleItem.skeleton";
import ArticleEmpty from "components/custom/article/article.empty";

const HomePage = () => {
  const dispatch = useDispatch();

  const articleFilter = useSelector((state: RootState) => state.articleFilter);
  const { pubDate, headline, countries } = articleFilter;
  const { data, isLoading } = useSelector((state: RootState) => state.article);

  const headerRef = useRef<HTMLDivElement>(null);

  const [isAPILoading, setIsAPILoading] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const openModal = () => {
    setIsModal(true);
  };

  const handleFilterChange = async (
    filter: Omit<ArticleFilterStore, "page">
  ) => {
    await Promise.all([
      dispatch(articleFilterActions.updateArticleFilter(filter)),
      dispatch(articleActions.resetData()),
    ]);

    setIsAPILoading(true);
  };

  const articleTrigger = () => {
    setIsAPILoading(true);
  };

  useEffect(() => {
    if (!isAPILoading) return;

    dispatch(articleActions.requestData(articleFilter));
    setIsAPILoading(false);
  }, [isAPILoading]);

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
          getArticleTrigger={articleTrigger}
          loadingComponent={<ArticleItemSkeleton />}
          emptyComponent={
            <ArticleEmpty
              title={"조건에 맞는 기사가 없습니다. \n조건을 다시 설정해보세요."}
            />
          }
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
