import React from "react";
import { ReactComponent as Image } from "assets/images/rawImages/magnifyingGlassIcon.svg";

interface Props {
  color: string;
}

const MagnifyingGlassComponent = ({ color }: Props) => {
  return <Image fill={color} />;
};

export default MagnifyingGlassComponent;
