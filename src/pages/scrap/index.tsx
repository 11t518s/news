import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "stores";
import { ArticleFilterStore } from "stores/articleFilter/type";
import { scrapArticleFilterActions } from "stores/scrapArticleFilter";
import { scrapArticleActions } from "stores/scrapArticle";
import { scrapArticleDB } from "localDatabase";

import ArticleFilterHeader from "components/custom/articleFilterHeader";
import ArticleItemContainer from "components/custom/article";
import ArticleFilterModal from "components/custom/articleFilterModal";
import ArticleEmpty from "components/custom/article/article.empty";
import BasicButton from "components/button/basicButton";

const ScrapPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { data: scrapArticles, isLoading } = useSelector(
    (state: RootState) => state.scrapArticle
  );
  const scrapArticleFilter = useSelector(
    (state: RootState) => state.scrapArticleFilter
  );
  const { pubDate, headline, countries } = scrapArticleFilter;

  const headerRef = useRef<HTMLDivElement>(null);

  const [isIndexedDBLoading, setIsIndexedDBLoading] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [isHasScrap, setIsHasScrap] = useState(true);
  const openModal = () => {
    setIsModal(true);
  };

  const handleFilterChange = (filter: Omit<ArticleFilterStore, "page">) => {
    dispatch(scrapArticleFilterActions.updateArticleFilter(filter));
    dispatch(scrapArticleActions.requestData(filter));
    setIsIndexedDBLoading(true);
  };

  const articleTrigger = () => {
    setIsIndexedDBLoading(true);
  };

  const goToHome = () => {
    navigation("/");
  };

  useLayoutEffect(() => {
    (async function () {
      const scrapArticleFromDB = await scrapArticleDB.read();
      setIsHasScrap(scrapArticleFromDB.length > 0);
    })();
  }, [scrapArticles]);

  useEffect(() => {
    if (!isIndexedDBLoading) return;

    dispatch(scrapArticleActions.requestData(scrapArticleFilter));
    setIsIndexedDBLoading(false);
  }, [isIndexedDBLoading]);

  useLayoutEffect(() => {
    headerRef.current && setHeaderHeight(headerRef.current.clientHeight);
  }, [isLoading, isHasScrap]);

  return (
    <Container>
      {isHasScrap && (
        <ArticleFilterHeader
          onClick={openModal}
          pubDate={pubDate}
          headline={headline}
          countries={countries}
          ref={headerRef}
        />
      )}

      <ContentContainer excludeHeight={headerHeight}>
        <ArticleItemContainer
          isLoading={isLoading}
          articles={scrapArticles}
          getArticleTrigger={articleTrigger}
          emptyComponent={
            <ArticleEmpty
              title={
                isHasScrap
                  ? "???????????? ????????? ????????????. \n????????? ?????? ??????????????????!"
                  : "????????? ???????????? ????????????."
              }
              buttonComponent={
                !isHasScrap && (
                  <BasicButton label={"????????? ?????? ??????"} onClick={goToHome} />
                )
              }
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

export default ScrapPage;

const Container = styled.div`
  width: 375px;
`;

const ContentContainer = styled.div<{ excludeHeight: number }>`
  padding-top: ${({ excludeHeight }) => `${excludeHeight}px`};
  height: ${({ excludeHeight }) => `calc(100% - ${excludeHeight}px)`};
`;
