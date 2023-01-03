import React, { Dispatch, ReactNode, SetStateAction } from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  children: ReactNode;
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const BasicModal = ({ isModal, setIsModal, children }: Props) => {
  const closeModal = () => {
    setIsModal(false);
  };
  const clickInnerContainer = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    <>
      <OuterContainer isModal={isModal} onClick={closeModal} />
      <InnerContainer isModal={isModal} onClick={clickInnerContainer}>
        {children}
      </InnerContainer>
    </>
  );
};

export default BasicModal;

const outerOpenAnimation = keyframes`
    from {
      opacity: 0;
      visibility: visible;
    }
    to {
      opacity: 0.5;
    }
    
`;

const outerCloseAnimation = keyframes`
    from {
      opacity: 0.5;
    }
    to {
      opacity: 0;
      visibility: hidden;
    }
`;

const OuterContainer = styled.div<{ isModal: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 998;
  cursor: pointer;
  animation: ${({ isModal }) =>
      isModal ? outerOpenAnimation : outerCloseAnimation}
    0.2s linear forwards;
`;

const innerOpenAnimation = keyframes`
    from {
      opacity: 0;
      visibility: visible;
    }
    to {
      opacity: 1;
    }
    
`;

const innerCloseAnimation = keyframes`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      visibility: hidden;
    }
`;
const InnerContainer = styled.div<{ isModal: boolean }>`
  animation: ${({ isModal }) =>
      isModal ? innerOpenAnimation : innerCloseAnimation}
    0.2s linear forwards;

  background-color: ${({ theme }) => theme.color.white};
  position: absolute;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 16px;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  z-index: 999;
`;
