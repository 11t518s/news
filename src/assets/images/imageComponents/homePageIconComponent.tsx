import React from "react";
import { ReactComponent as Home } from "assets/images/rawImages/homePageIcon.svg";

interface Props {
  color: string;
}

const HomePageIconComponent = ({ color }: Props) => {
  return <Home fill={color} />;
};

export default HomePageIconComponent;
