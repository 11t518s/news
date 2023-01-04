import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  children: ReactNode;
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const BasicModal = ({ isModal, setIsModal, children }: Props) => {
  const [initial, setInitial] = useState(true);
  const closeModal = () => {
    setIsModal(false);
  };
  const clickInnerContainer = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setTimeout(() => setInitial(false), 500);
  }, []);

  return (
    <>
      <OuterContainer
        isModal={isModal}
        initial={initial}
        onClick={closeModal}
      />
      <InnerContainer
        isModal={isModal}
        initial={initial}
        onClick={clickInnerContainer}
      >
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

const OuterContainer = styled.div<{ isModal: boolean; initial: boolean }>`
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
    ${({ initial }) => (initial ? "0s" : "0.2s")} linear forwards;
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

const InnerContainer = styled.div<{ isModal: boolean; initial: boolean }>`
  animation: ${({ isModal }) =>
      isModal ? innerOpenAnimation : innerCloseAnimation}
    ${({ initial }) => (initial ? "0s" : "0.2s")} linear forwards;

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
