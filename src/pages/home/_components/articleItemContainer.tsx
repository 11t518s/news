import React, { useEffect } from "react";
import styled from "styled-components";
import { RootState } from "../../../stores";
import { useDispatch, useSelector } from "react-redux";
import { articleActions } from "../../../stores/article";
import { useInView } from "react-intersection-observer";
import ArticleItem from "./articleItem";

const ArticleItemContainer = () => {
  const { data, isLoading } = useSelector((state: RootState) => state.article);
  const articleFilter = useSelector((state: RootState) => state.articleFilter);
  const dispatch = useDispatch();

  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;

    dispatch(articleActions.requestData(articleFilter));
  }, [inView]);

  return (
    <Container>
      {data.map((item, index) => (
        <ArticleItem article={item} key={`${item._id}_${index}`} />
      ))}
      <div ref={ref} />
      {isLoading && <div>불러오는중</div>}
    </Container>
  );
};

export default ArticleItemContainer;

const Container = styled.div`
  padding: 20px;
`;
