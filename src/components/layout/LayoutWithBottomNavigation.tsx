import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

import bottomNavigationImages from "assets/images/router/bottomNavigation";
import { PageRouteEnum } from "pages/type";

import BottomNavigation from "components/custom/bottomNavigation";

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
        initialRoute={PageRouteEnum.home}
      >
        <BottomNavigation.Tab
          route={PageRouteEnum.home}
          iconComponent={(color: string) => (
            <bottomNavigationImages.homeIconComponent color={color} />
          )}
          title={"홈"}
        />
        <BottomNavigation.Tab
          route={PageRouteEnum.scrap}
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
  height: ${({ excludeHeight }) => `calc(100% - ${excludeHeight}px)`};
  &.box {
    -ms-overflow-style: none;
  }
  &.box::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
