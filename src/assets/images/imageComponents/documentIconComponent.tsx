import React from "react";
import { ReactComponent as Scrap } from "assets/images/rawImages/documentIcon.svg";

interface Props {
  color: string;
}

const DocumentIconComponent = ({ color }: Props) => {
  return <Scrap fill={color} />;
};

export default DocumentIconComponent;
