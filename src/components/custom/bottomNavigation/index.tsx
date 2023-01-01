import { createContext, forwardRef, useContext, useState } from "react";
import styled from "styled-components";
import {
  BottomNavigationContext,
  BottomNavigationProps,
  BottomTabRouteEnum,
  BottomTabContainerProps,
} from "./type";
import { useNavigate } from "react-router-dom";
import theme from "../../../theme";

const initialBottomNavigationContext: BottomNavigationContext = {
  bottomRouteState: BottomTabRouteEnum.home,
  setBottomRouteState: () => {},
  isActive: () => false,
};

const bottomNavigationContext = createContext<BottomNavigationContext>(
  initialBottomNavigationContext
);

const BottomNavigation = forwardRef<HTMLDivElement, BottomNavigationProps>(
  ({ children, initialRoute }, ref) => {
    const [bottomTabRoute, setBottomTabRoute] =
      useState<BottomTabRouteEnum>(initialRoute);
    const isActive = (thisRoute: BottomTabRouteEnum) =>
      bottomTabRoute === thisRoute;

    return (
      <bottomNavigationContext.Provider
        value={{
          bottomRouteState: bottomTabRoute,
          setBottomRouteState: setBottomTabRoute,
          isActive,
        }}
      >
        <MainContainer ref={ref}>{children}</MainContainer>
      </bottomNavigationContext.Provider>
    );
  }
);

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.color.black};
  display: flex;
  justify-content: space-between;
  border-radius: 30px;
  width: 100%;
  padding: 0 60px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
`;

const BottomTabContainer = ({
  route,
  activeColor = theme.color.white,
  inActiveColor = theme.color.darkGray,
  iconComponent,
  title,
  onClick,
}: BottomTabContainerProps) => {
  const navigation = useNavigate();
  const { isActive, setBottomRouteState } = useContext(bottomNavigationContext);
  const handleBottomTabContainerClick = () => {
    onClick && onClick();
    navigation(`/${route}`);
    setBottomRouteState(route);
  };
  return (
    <TabContainer onClick={handleBottomTabContainerClick}>
      {iconComponent && (
        <IconContainer>
          {iconComponent(isActive(route) ? activeColor : inActiveColor)}
        </IconContainer>
      )}
      {title && (
        <TitleContainer
          isActive={isActive(route)}
          activeColor={activeColor}
          inActiveColor={inActiveColor}
        >
          {title}
        </TitleContainer>
      )}
    </TabContainer>
  );
};

const TabContainer = styled.div`
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const IconContainer = styled.div`
  margin-bottom: 10px;
`;
const TitleContainer = styled.p<{
  activeColor: string;
  isActive: boolean;
  inActiveColor: string;
}>`
  color: ${({ activeColor, isActive, inActiveColor }) =>
    isActive ? activeColor : inActiveColor};
`;

const total = Object.assign(BottomNavigation, { Tab: BottomTabContainer });

export default total;
