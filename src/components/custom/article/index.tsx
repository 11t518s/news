import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import ArticleItem from "./articleItem";

import { Article } from "apis/nyTimes/type";
import { IndexedDBArticle } from "localDatabase/type";
import { scrapArticleDB } from "localDatabase";

import BasicToast from "components/toast/basicToast";

interface Props {
  articles: Article[];
  isLoading: boolean;
  getArticle: () => void;
  emptyTitle: string;
}

const ArticleItemContainer = ({
  articles,
  isLoading,
  getArticle,
  emptyTitle,
}: Props) => {
  const [ref, inView] = useInView();

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
    if (!inView) return;

    getArticle();
  }, [inView]);

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
      <div ref={ref} />

      <BasicToast
        isToast={isToast}
        setIsToast={setIsToast}
        title={isScrap ? "스크랩 하셨습니다!" : "스크랩을 취소하셨습니다."}
      />
      {isLoading && <div>불러오는중</div>}
    </Container>
  );
};

export default ArticleItemContainer;

const Container = styled.div`
  padding: 20px;
`;
