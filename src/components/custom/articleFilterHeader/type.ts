import { ReactNode } from "react";

import { PageRouteEnum } from "pages/type";

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
