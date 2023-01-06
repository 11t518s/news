import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArticleItem from "./articleItem";

import { Article } from "apis/nyTimes/type";
import { IndexedDBArticle } from "localDatabase/type";
import { scrapArticleDB } from "localDatabase";

import BasicToast from "components/toast/basicToast";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

interface Props {
  articles: Article[];
  isLoading: boolean;
  getArticle: () => void;
  emptyTitle: string;
  loadingComponent?: ReactNode;
}

const ArticleItemContainer = ({
  articles,
  isLoading,
  getArticle,
  emptyTitle,
  loadingComponent,
}: Props) => {
  const observeTargetElementRef = useRef<HTMLDivElement>(null);
  const [observe, unobserve] = useIntersectionObserver(() => getArticle());

  const [scrapArticles, setScrapArticles] = useState<IndexedDBArticle[]>([]);
  const [isToast, setIsToast] = useState(false);
  const [isScrap, setIsScrap] = useState(false);

  const getScrapId = (article: Article) =>
    scrapArticles.find((scrapArticle) => scrapArticle._id === article._id)?.ID;

  const getScrapArticles = async () => {
    return scrapArticleDB.read();
  };

  const toastTrigger = (data: IndexedDBArticle[]) => {
    setIsScrap(data.length > scrapArticles.length);

    setIsToast(false);
    setTimeout(() => {
      setIsToast(true);
    }, 100);
  };

  const handleScrapClick = async () => {
    const data = await getScrapArticles();
    setScrapArticles(data);
    toastTrigger(data);
  };

  useEffect(() => {
    if (!observeTargetElementRef.current) return;

    let observeRef: HTMLDivElement;
    observeRef = observeTargetElementRef.current;
    observe(observeRef);
    return () => {
      unobserve(observeRef);
    };
  }, [observeTargetElementRef.current]);

  useEffect(() => {
    setTimeout(async () => {
      const data = await getScrapArticles();
      setScrapArticles(data);
    }, 0);
  }, []);

  return (
    <Container>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <ArticleItem
            article={article}
            scrapId={getScrapId(article)}
            key={`${article._id}_${index}`}
            onScrapClick={handleScrapClick}
          />
        ))
      ) : isLoading ? null : (
        <>{emptyTitle}</>
      )}
      <div ref={observeTargetElementRef} />

      <BasicToast
        isToast={isToast}
        setIsToast={setIsToast}
        title={isScrap ? "스크랩 하셨습니다!" : "스크랩을 취소하셨습니다."}
      />
      {isLoading && <LoadingContainer>{loadingComponent}</LoadingContainer>}
    </Container>
  );
};

export default ArticleItemContainer;

const Container = styled.div`
  padding: 20px;
`;

const LoadingContainer = styled.div``;
