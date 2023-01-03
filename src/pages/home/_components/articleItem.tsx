import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Article } from "../../../apis/nyTimes/type";
import { convertDateForArticle } from "../../../utils/time";
import articleImages from "../../../assets/images/router/article";
import theme from "../../../theme";
import BasicToast from "../../../components/toast/basicToast";

interface Props {
  article: Article;
}

const ArticleItem = ({ article }: Props) => {
  const [isScrap, setIsScrap] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const handleScrapClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (isScrap) {
      // 스크렙 해제 하기
    } else {
      // 스크렙 등록 하기
    }
    setIsToast(false);
    setTimeout(() => {
      setIsToast(true);
    }, 0);
    setIsScrap((prev) => !prev);
  };

  useLayoutEffect(() => {}, []);
  return (
    <Container href={article.web_url}>
      <TopElement>
        <h1>{article.headline.main}</h1>
        <span onClick={handleScrapClick}>
          {isScrap ? (
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
        title={isScrap ? "스크랩 하셨습니다!" : "스크랩을 취소하셨습니다."}
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
