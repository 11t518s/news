import React, { CSSProperties } from "react";
import styled from "styled-components";

interface Props {
  label: string;
  onClick: () => void;
  buttonStyle?: CSSProperties;
}

const BasicButton = ({ label, onClick, buttonStyle }: Props) => {
  return (
    <Button onClick={onClick} style={{ ...buttonStyle }}>
      {label}
    </Button>
  );
};

export default BasicButton;

const Button = styled.button`
  background-color: ${({ theme }) => theme.color.mainBLue};
  color: ${({ theme }) => theme.color.white};
  border-radius: 16px;
  font-weight: 600;
  line-height: 24px;
  width: 295px;
  padding: 18px;

  cursor: pointer;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
