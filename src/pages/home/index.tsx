import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { newsActions } from "../../stores/news";

const Home = () => {
  const { data, isLoading } = useSelector((state: RootState) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(newsActions.requestData());
  }, []);

  return (
    <Container>
      <button
        onClick={() => {
          dispatch(newsActions.requestData());
        }}
      >
        asdfasdf
      </button>

      {data.map((item) => (
        <div>{item.headline.main}</div>
      ))}
      {isLoading && <div>불러오는중</div>}
    </Container>
  );
};

export default Home;

const Container = styled.div``;
