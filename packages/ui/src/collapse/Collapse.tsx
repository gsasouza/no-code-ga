import * as React from 'react';
import { Dialog, DialogProps } from 'reakit';

type Props = DialogProps;

const Collapse: React.FC<Props> = ({ ...props }) => {
  return (
    <>
      <Dialog {...props} aria-label="Welcome" style={{ position: 'static', transform: 'none' }}>
        Focus is not trapped within me.
      </Dialog>
    </>
  );
};

export default Collapse;
