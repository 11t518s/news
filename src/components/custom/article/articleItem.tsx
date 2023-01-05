import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { IndexedDBArticle } from "localDatabase/type";
import { RootState } from "stores";
import { scrapArticleDB } from "localDatabase";
import { scrapArticleActions } from "stores/scrapArticle";
import theme from "theme";
import articleImages from "assets/images/router/article";
import { convertDateForArticle } from "utils/time";

interface Props {
  article: IndexedDBArticle;
  scrapId: number | undefined;
  onScrapClick?: () => Promise<void>;
}

const ArticleItem = ({ article, scrapId, onScrapClick }: Props) => {
  const dispatch = useDispatch();

  const scrapFilter = useSelector(
    (state: RootState) => state.scrapArticleFilter
  );

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
    onScrapClick && (await onScrapClick());
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
          {"  "}
          {article.byline.person[0]?.firstname}{" "}
          {article.byline.person[0]?.lastname}
        </ArticleInfo>
        <DateType>{convertDateForArticle(article.pub_date)}</DateType>
      </BottomElement>
    </Container>
  );
};

export default ArticleItem;

export const Container = styled.a`
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

export const TopElement = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  span {
    margin-left: 11px;
    display: flex;
    justify-content: flex-end;
  }
`;
export const BottomElement = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ArticleInfo = styled.p`
  font-size: 13px;
  line-height: 20px;
`;
const DateType = styled.p`
  font-size: 13px;

  line-height: 20px;
  color: ${({ theme }) => theme.color.darkGray};
`;
