import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { IndexedDBArticle } from "localDatabase/type";
import { RootState } from "stores";
import { scrapArticleDB } from "localDatabase";
import { scrapArticleActions } from "stores/scrapArticle";
import theme from "theme";
import articleImages from "assets/images/router/article";
import { convertDateForArticle } from "utils/time";

import BasicToast from "components/toast/basicToast";

interface Props {
  article: IndexedDBArticle;
  scrapId: number | undefined;
  refreshScrapArticles: () => void;
}

const ArticleItem = ({ article, scrapId, refreshScrapArticles }: Props) => {
  const dispatch = useDispatch();

  const scrapFilter = useSelector(
    (state: RootState) => state.scrapArticleFilter
  );

  const [isToast, setIsToast] = useState(false);
  const handleScrapClick = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (scrapId) {
      dispatch(scrapArticleActions.deleteArticle(article));
      await scrapArticleDB.delete(scrapId);
    } else {
      dispatch(scrapArticleActions.addArticle({ article, scrapFilter }));
      await scrapArticleDB.create(article);
    }
    await refreshScrapArticles();
    setIsToast(false);
    setTimeout(() => {
      setIsToast(true);
    }, 100);
  };

  return (
    <Container href={article.web_url}>
      <TopElement>
        <h1>{article.headline.main}</h1>
        <span onClick={handleScrapClick}>
          {scrapId ? (
            <articleImages.activeScrape color={theme.color.yellow} />
          ) : (
            <articleImages.inactiveScrape color={theme.color.darkGray} />
          )}
        </span>
      </TopElement>
      <BottomElement>
        <ArticleInfo>
          {article.byline.organization}
          {"  "} {article.byline.person[0]?.firstname}{" "}
          {article.byline.person[0]?.lastname}
        </ArticleInfo>
        <DateType>{convertDateForArticle(article.pub_date)}</DateType>
      </BottomElement>
      <BasicToast
        isToast={isToast}
        setIsToast={setIsToast}
        title={scrapId ? "스크랩 하셨습니다!" : "스크랩을 취소하셨습니다."}
      />
    </Container>
  );
};

export default ArticleItem;

const Container = styled.a`
  cursor: pointer;
  display: block;
  background-color: ${({ theme }) => theme.color.white};
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 8px;

  h1 {
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
  }
`;

const TopElement = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  span {
    margin-left: 11px;
    display: flex;
    justify-content: flex-end;
  }
`;
const BottomElement = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArticleInfo = styled.p`
  font-size: 13px;
  line-height: 20px;
`;
const DateType = styled.p`
  font-size: 13px;

  line-height: 20px;
  color: ${({ theme }) => theme.color.darkGray};
`;
