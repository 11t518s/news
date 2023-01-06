import React from "react";
import { ReactComponent as Scrap } from "assets/images/rawImages/scrapPageIcon.svg";

interface Props {
  color: string;
}

const ScrapPageIconComponent = ({ color }: Props) => {
  return <Scrap stroke={color} />;
};

export default ScrapPageIconComponent;
