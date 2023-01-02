import React from "react";
import { ReactComponent as Scrap } from "assets/images/scrapPageIcon.svg";

interface Props {
  color: string;
}

const ScrapPageIcon = ({ color }: Props) => {
  return <Scrap stroke={color} />;
};

export default ScrapPageIcon;
