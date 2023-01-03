import { PageRouteEnum } from "../../pages/type";
import { ReactNode } from "react";

export interface ArticleFilterHeaderContext {
  route: PageRouteEnum;
}

export interface ArticleFilterHeaderProps {
  children: ReactNode;
  route: PageRouteEnum;
}
export interface ArticleFilterHeaderElementProps {
  iconComponent?: (color: string) => ReactNode;
  title?: string;
  activeColor: string;
  inactiveColor: string;
  onClick: () => void;
}
