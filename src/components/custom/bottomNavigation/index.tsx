import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import {
  BottomNavigationContext,
  BottomNavigationProps,
  BottomTabContainerProps,
} from "./type";
import { PageRouteEnum } from "pages/type";
import theme from "theme";

const initialBottomNavigationContext: BottomNavigationContext = {
  bottomRouteState: window.location.pathname.replace("/", "") as PageRouteEnum,
  setBottomRouteState: () => {},
  isActive: () => false,
};

const bottomNavigationContext = createContext<BottomNavigationContext>(
  initialBottomNavigationContext
);

const BottomNavigation = forwardRef<HTMLDivElement, BottomNavigationProps>(
  ({ children, initialRoute }, ref) => {
    const location = useLocation();
    const [bottomTabRoute, setBottomTabRoute] =
      useState<PageRouteEnum>(initialRoute);
    const isActive = (thisRoute: PageRouteEnum) => bottomTabRoute === thisRoute;

    useEffect(() => {
      setBottomTabRoute(location.pathname.replace("/", "") as PageRouteEnum);
    }, [location.pathname]);

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
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  width: 375px;
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
  const { isActive, setBottomRouteState } = useContext(bottomNavigationContext);
  const handleBottomTabContainerClick = () => {
    onClick && onClick();
    setBottomRouteState(route);
  };
  return (
    <Link to={route}>
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
    </Link>
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
