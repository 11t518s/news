import { createContext, forwardRef, useState } from "react";
import styled from "styled-components";
import {
  ArticleFilterHeaderContext,
  ArticleFilterHeaderElementProps,
  ArticleFilterHeaderProps,
} from "./type";
import { PageRouteEnum } from "../../pages/type";

const initialBottomNavigationContext: ArticleFilterHeaderContext = {
  route: PageRouteEnum.home,
};

const bottomNavigationContext = createContext<ArticleFilterHeaderContext>(
  initialBottomNavigationContext
);

const BottomNavigation = forwardRef<HTMLDivElement, ArticleFilterHeaderProps>(
  ({ children, route }, ref) => {
    return (
      <bottomNavigationContext.Provider
        value={{
          route,
        }}
      >
        <MainContainer ref={ref}>{children}</MainContainer>
      </bottomNavigationContext.Provider>
    );
  }
);

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 13px 20px;
  width: 100%;
  position: fixed;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray};
  box-sizing: border-box;
  display: flex;
  flex-direction: row; ;
`;

const Element = ({
  onClick,
  iconComponent,
  title,
  activeColor,
  inactiveColor,
}: ArticleFilterHeaderElementProps) => {
  const [isActive, setIsActive] = useState(false);
  const handleElementClick = () => {
    setIsActive((prev) => !prev);
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
  padding: 5px 12px;
  margin-right: 8px;
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
`;

const total = Object.assign(BottomNavigation, { Element });

export default total;
