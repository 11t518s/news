import { PageRouteEnum } from "pages/type";
import { ReactNode } from "react";

export interface ArticleFilterHeaderContext {
  route: PageRouteEnum;
  activeColor: string;
  inactiveColor: string;
}

export interface ArticleFilterHeaderProps {
  children: ReactNode;
  route: PageRouteEnum;
  activeColor: string;
  inactiveColor: string;
}
export interface ArticleFilterHeaderElementProps {
  iconComponent?: (color: string) => ReactNode;
  title?: string;
  isActive: boolean;
  onClick: () => void;
}
