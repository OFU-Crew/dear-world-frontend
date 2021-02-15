import React, { FunctionComponent, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: inherit;
  outline: 0;

  animation: ${fadeIn};
  animation-duration: 0.6s;
`;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 500;
`;

export const StyledModal = styled.div`
  z-index: 100;
  position: relative;
  margin: auto;
  border-radius: 20px;
`;

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  modalContent: JSX.Element;
  headerText?: string;
}

const Modal: FunctionComponent<ModalProps> = ({
  isShown,
  hide,
  modalContent,
  headerText,
}) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27 && isShown) {
      hide();
    }
  };

  useEffect(() => {
    isShown
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
    document.addEventListener('keydown', onKeyDown, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
  }, [isShown]);

  const modal = (
    <React.Fragment>
      <Backdrop onClick={hide} />
      <Wrapper
        aria-modal
        aria-labelledby={headerText}
        tabIndex={-1}
        role="dialog"
      >
        <StyledModal>{modalContent}</StyledModal>
      </Wrapper>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;
