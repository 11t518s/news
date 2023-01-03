import React from "react";
import { ReactComponent as Image } from "assets/images/rawImages/calendarIcon.svg";

interface Props {
  color: string;
}

const CalendarIconComponent = ({ color }: Props) => {
  return <Image fill={color} />;
};

export default CalendarIconComponent;
