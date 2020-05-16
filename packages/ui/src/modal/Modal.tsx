import * as React from 'react';
import { Dialog, DialogBackdrop, DialogProps } from 'reakit/Dialog';
import styled from 'styled-components';

export const Backdrop = styled(DialogBackdrop)`
  color: #000000;
  width: 100%;
  position: fixed;
  top: 0;
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.45);
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  &[data-enter] {
    opacity: 1;
  }
`;

const DialogContainer = styled(Dialog)`
  padding: 1rem;
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  transform-origin: top center;
  transform: translate3d(0, -10%, 0) rotateX(90deg);
  &[data-enter] {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

interface Props extends DialogProps {
  ariaLabel: string;
}

const Modal: React.FC<Props> = ({
  ariaLabel,
  children,
  unstable_finalFocusRef,
  unstable_initialFocusRef,
  ...props
}) => {
  return (
    <>
      <Backdrop {...props}>
        <DialogContainer
          {...props}
          aria-label={ariaLabel}
          hideOnEsc={true}
          hideOnClickOutside={true}
          unstable_finalFocusRef={unstable_finalFocusRef}
          unstable_initialFocusRef={unstable_initialFocusRef}
        >
          {children}
        </DialogContainer>
      </Backdrop>
    </>
  );
};

export default Modal;
