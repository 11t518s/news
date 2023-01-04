import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import ArticleItem from "./articleItem";
import { Article } from "apis/nyTimes/type";
import { scrapArticleDB } from "../../../localDatabase";
import { IndexedDBArticle } from "../../../localDatabase/type";

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

  const getScrapId = (article: Article) =>
    scrapArticles.find((scrapArticle) => scrapArticle._id === article._id)?.ID;

  const refreshScrapArticles = async () => {
    const data = await scrapArticleDB.read();

    setScrapArticles(data);
  };

  useEffect(() => {
    if (!inView) return;

    getArticle();
  }, [inView]);

  useEffect(() => {
    setTimeout(async () => {
      await refreshScrapArticles();
    }, 0);

    refreshScrapArticles();
  }, []);

  return (
    <Container>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <ArticleItem
            article={article}
            scrapId={getScrapId(article)}
            key={`${article._id}_${index}`}
            refreshScrapArticles={refreshScrapArticles}
          />
        ))
      ) : isLoading ? null : (
        <>{emptyTitle}</>
      )}
      <div ref={ref} />

      {isLoading && <div>불러오는중</div>}
    </Container>
  );
};

export default ArticleItemContainer;

const Container = styled.div`
  padding: 20px;
`;
