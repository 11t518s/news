import { CSSProperties, Dispatch, ReactNode, SetStateAction } from "react";

export interface BottomNavigationContext {
  bottomRouteState: BottomTabRouteEnum;
  setBottomRouteState: Dispatch<SetStateAction<BottomTabRouteEnum>>;
  isActive: (thisRoute: BottomTabRouteEnum) => boolean;
}
export interface PropsWithChildren {
  children: ReactNode;
}

export const enum BottomTabRouteEnum {
  home = "",
  scrap = "scrap",
}

export interface BottomNavigationProps extends PropsWithChildren {
  initialRoute: BottomTabRouteEnum;
}

export interface BottomTabContainerProps {
  route: BottomTabRouteEnum;
  activeColor?: string;
  inActiveColor?: string;
  iconComponent?: (color: string) => ReactNode;
  title?: string;
  onClick?: () => void;
}
export interface ProductInfoProps {
  price?: number;
  priceStyle?: CSSProperties;
  name?: string;
  nameStyle?: CSSProperties;
}
