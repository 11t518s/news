import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  isToast: boolean;
  setIsToast: Dispatch<SetStateAction<boolean>>;
  title: string;
}

const BasicToast: FC<Props> = ({ isToast, setIsToast, title }) => {
  useEffect(() => {}, []);
  const toastTrigger = () => {};

  useEffect(() => {
    toastTrigger();
    if (!isToast) return;

    const toastTimeout = setTimeout(() => {
      setIsToast(false);
    }, 2500);

    return () => {
      clearTimeout(toastTimeout);
    };
  }, [isToast]);

  return <>{isToast ? <Toast>{title}</Toast> : null}</>;
};

export default BasicToast;

const toastAnimation = keyframes`
    from {
      opacity: 0;
      transform: translateY(0)
    }
    20% {
      opacity: 1;
      transform:translateY(-20px);
    }
    80% {
      opacity: 1;
      transform:translateY(-20px);
    }
    to {
      opacity: 0;
      transform: translateY(0);
    }
`;

const Toast = styled.div`
  z-index: 1;
  padding: 12px 32px;
  border-radius: 10px;

  animation: ${toastAnimation} 2.5s linear forwards;

  width: 275px;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  position: fixed;
  bottom: 100px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.black};
`;
