import React from "react";
import { ReactComponent as Scrap } from "assets/images/scrapIcon.svg";

interface Props {
  color: string;
}

const ScrapIcon = ({ color }: Props) => {
  return <Scrap stroke={color} />;
};

export default ScrapIcon;
