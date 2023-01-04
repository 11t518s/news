import { PageRouteEnum } from "pages/type";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface BottomNavigationContext {
  bottomRouteState: PageRouteEnum;
  setBottomRouteState: Dispatch<SetStateAction<PageRouteEnum>>;
  isActive: (thisRoute: PageRouteEnum) => boolean;
}
export interface PropsWithChildren {
  children: ReactNode;
}

export interface BottomNavigationProps extends PropsWithChildren {
  initialRoute: PageRouteEnum;
}

export interface BottomTabContainerProps {
  route: PageRouteEnum;
  activeColor?: string;
  inActiveColor?: string;
  iconComponent?: (color: string) => ReactNode;
  title?: string;
  onClick?: () => void;
}
