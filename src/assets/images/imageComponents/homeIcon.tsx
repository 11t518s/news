import React from "react";
import { ReactComponent as Home } from "assets/images/homeIcon.svg";

interface Props {
  color: string;
}

const HomeIcon = ({ color }: Props) => {
  return <Home fill={color} />;
};

export default HomeIcon;
