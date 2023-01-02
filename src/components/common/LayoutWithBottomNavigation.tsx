import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import BottomNavigation from "../custom/bottomNavigation";
import { BottomTabRouteEnum } from "../custom/bottomNavigation/type";
import bottomNavigationImages from "../../assets/images/router/bottomNavigation";

interface Props {
  children: ReactNode;
}

const LayoutWithBottomNavigation = ({ children }: Props) => {
  const [bottomNavigationHeight, setBottomNavigationHeight] = useState(0);
  const bottomNavigationRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    bottomNavigationRef.current &&
      setBottomNavigationHeight(bottomNavigationRef.current.clientHeight);
  }, []);

  return (
    <Container>
      <ContentContainer excludeHeight={bottomNavigationHeight}>
        {children}
      </ContentContainer>
      <BottomNavigation
        ref={bottomNavigationRef}
        initialRoute={BottomTabRouteEnum.home}
      >
        <BottomNavigation.Tab
          route={BottomTabRouteEnum.home}
          iconComponent={(color: string) => (
            <bottomNavigationImages.homeIconComponent color={color} />
          )}
          title={"홈"}
        />
        <BottomNavigation.Tab
          route={BottomTabRouteEnum.scrap}
          iconComponent={(color: string) => (
            <bottomNavigationImages.scrapIconComponent color={color} />
          )}
          title={"스크랩"}
        />
      </BottomNavigation>
    </Container>
  );
};

export default LayoutWithBottomNavigation;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: 375px;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.background};
`;
const ContentContainer = styled.div<{ excludeHeight: number }>`
  padding-bottom: ${({ excludeHeight }) => `${excludeHeight}px`};
  overflow: scroll;
  height: ${({ excludeHeight }) => `calc(100vh - ${excludeHeight}px)`};
`;
