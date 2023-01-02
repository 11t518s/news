import React from "react";
import { ReactComponent as Image } from "assets/images/emptyStar.svg";

interface Props {
  color: string;
}

const EmptyStarComponent = ({ color }: Props) => {
  return <Image fill={color} />;
};

export default EmptyStarComponent;
