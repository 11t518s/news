import React, { createContext, forwardRef, useContext } from "react";
import styled from "styled-components";

import theme from "theme";
import { PageRouteEnum } from "pages/type";
import {
  ArticleFilterHeaderContext,
  ArticleFilterHeaderElementProps,
  ArticleFilterHeaderProps,
} from "./type";

const initialArticleBaseFilterHeaderContext: ArticleFilterHeaderContext = {
  route: PageRouteEnum.home,
  activeColor: theme.color.subSkyBlue,
  inactiveColor: theme.color.gray,
};

const BaseArticleFilterHeaderContext =
  createContext<ArticleFilterHeaderContext>(
    initialArticleBaseFilterHeaderContext
  );

const BottomNavigation = forwardRef<HTMLDivElement, ArticleFilterHeaderProps>(
  ({ children, route, inactiveColor, activeColor }, ref) => {
    return (
      <BaseArticleFilterHeaderContext.Provider
        value={{
          route,
          activeColor,
          inactiveColor,
        }}
      >
        <MainContainer ref={ref}>{children}</MainContainer>
      </BaseArticleFilterHeaderContext.Provider>
    );
  }
);

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 13px 15px;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray};
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  top: 0;
  margin: 0 auto;
  width: 375px;
`;

const Element = ({
  onClick,
  iconComponent,
  title,
  isActive,
}: ArticleFilterHeaderElementProps) => {
  const { activeColor, inactiveColor } = useContext(
    BaseArticleFilterHeaderContext
  );
  const handleElementClick = () => {
    onClick();
  };
  return (
    <ArticleFilterElementContainer
      onClick={handleElementClick}
      isActive={isActive}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
    >
      {iconComponent && (
        <ItemComponentContainer
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          isActive={isActive}
        >
          {iconComponent(isActive ? activeColor : inactiveColor)}
        </ItemComponentContainer>
      )}
      {title && (
        <TitleContainer
          isActive={isActive}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
        >
          {title}
        </TitleContainer>
      )}
    </ArticleFilterElementContainer>
  );
};

const ArticleFilterElementContainer = styled.button<{
  isActive: boolean;
  activeColor: string;
  inactiveColor: string;
}>`
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 30px;
  height: 34px;
  border: 1px solid
    ${({ theme, activeColor, isActive }) =>
      isActive ? activeColor : theme.color.gray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemComponentContainer = styled.div<{
  isActive: boolean;
  activeColor: string;
  inactiveColor: string;
}>`
  display: flex;
  align-items: center;
  margin-right: 4px;
`;

const TitleContainer = styled.div<{
  isActive: boolean;
  activeColor: string;
  inactiveColor: string;
}>`
  color: ${({ activeColor, inactiveColor, isActive }) =>
    isActive ? activeColor : inactiveColor};
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 85px;
  white-space: nowrap;
`;

const total = Object.assign(BottomNavigation, { Element });

export default total;
