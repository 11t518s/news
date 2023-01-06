import React, { ReactNode } from "react";
import styled from "styled-components";

import articleImages from "assets/images/router/article";
import theme from "theme";

interface Props {
  title: string;
  buttonComponent?: ReactNode;
}

const ArticleEmpty = ({ title, buttonComponent }: Props) => {
  return (
    <Container>
      <IconContainer>
        <articleImages.emptyIcon color={theme.color.darkGray} />
      </IconContainer>
      <TitleContainer>{title}</TitleContainer>

      {buttonComponent}
    </Container>
  );
};

export default ArticleEmpty;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.div`
  margin-bottom: 8px;
`;

const TitleContainer = styled.div`
  white-space: pre-wrap;
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.color.darkGray};
  font-weight: 600;
`;
