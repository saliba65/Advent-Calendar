import React, { memo } from 'react';
// Types
import { HatchType } from '../../helpers';
// Styles
import { Wrapper } from './Hatch.styles';

type Props = { 
  hatch: HatchType;
  handleCLick: (nr: number) => void;
  enableCallback: (nr: number) => boolean;
}

const Hatch: React.FC<Props> = ({hatch: {nr, text, img, open}, handleCLick, enableCallback }) => (
  <Wrapper open={open} background={img} enabled={enableCallback(nr)} onClick={() => handleCLick(nr)}>
    <div className='front'>
      <p>{nr}</p>
    </div>
    <div className='back'>
      <p>{text}</p>
    </div>
  </Wrapper>
);

export default memo(Hatch);
