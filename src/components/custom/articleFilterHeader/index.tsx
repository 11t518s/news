import React, { forwardRef } from "react";
import theme from "theme";

import headerImages from "assets/images/router/header";
import { PageRouteEnum } from "pages/type";
import { Countries } from "stores/articleFilter";
import { convertDateForFilterHeader } from "utils/time";
import BaseArticleFilterHeader from "./base";

interface Props {
  onClick: () => void;
  headline: string;
  pubDate: Date | null;
  countries: Countries[];
}

const ArticleFilterHeader = forwardRef<HTMLDivElement, Props>(
  ({ onClick, countries, pubDate, headline }: Props, ref) => {
    const headlineText = headline ? headline : "전체 헤드라인";
    const pubDateText = pubDate
      ? convertDateForFilterHeader(pubDate)
      : "전체 날짜";
    const countriesText =
      countries.length >= 2
        ? `${countries[0].displayName} 외 ${countries.length - 1}개`
        : countries.length >= 1
        ? `${countries[0].displayName}`
        : "전체 국가";
    return (
      <BaseArticleFilterHeader
        activeColor={theme.color.mainBLue}
        inactiveColor={theme.color.darkGray}
        route={PageRouteEnum.home}
        ref={ref}
      >
        <BaseArticleFilterHeader.Element
          onClick={onClick}
          isActive={!!headline}
          title={headlineText}
          iconComponent={(color) => (
            <headerImages.headlineComponent color={color} />
          )}
        />
        <BaseArticleFilterHeader.Element
          onClick={onClick}
          isActive={!!pubDate}
          title={pubDateText}
          iconComponent={(color) => (
            <headerImages.calendarComponent color={color} />
          )}
        />

        <BaseArticleFilterHeader.Element
          onClick={onClick}
          isActive={countries.length > 0}
          title={countriesText}
        />
      </BaseArticleFilterHeader>
    );
  }
);

export default ArticleFilterHeader;
