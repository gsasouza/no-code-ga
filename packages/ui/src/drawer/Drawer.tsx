import * as React from 'react';
import { Dialog, DialogProps } from 'reakit/Dialog';
import styled from 'styled-components';

import { Backdrop } from '../modal/Modal';

const DialogContainer = styled(Dialog)`
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  max-width: 700px;
  width: 100%;
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  transform-origin: top center;
  transform: translate3d(50%, 0, 0);
  &[data-enter] {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

interface Props extends DialogProps {
  ariaLabel: string;
}

const Drawer: React.FC<Props> = ({ ariaLabel, children, ...props }) => {
  return (
    <>
      <Backdrop {...props}>
        <DialogContainer {...props} aria-label={ariaLabel} hideOnEsc={true} hideOnClickOutside={true}>
          {children}
        </DialogContainer>
      </Backdrop>
    </>
  );
};

export default Drawer;
