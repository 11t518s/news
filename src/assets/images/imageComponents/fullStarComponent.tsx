import React from "react";
import { ReactComponent as Image } from "assets/images/fullStar.svg";

interface Props {
  color: string;
}

const FullStarComponent = ({ color }: Props) => {
  return <Image fill={color} />;
};

export default FullStarComponent;
