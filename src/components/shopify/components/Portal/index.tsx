import { memo, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  id: string;
  children: ReactNode;
};

const Portal: React.FC<Props> = ({ id, children }) => {
  const el = useRef(document.getElementById(id) || document.createElement('div'));
  return id ? createPortal(children, el.current) : null;
};

export default memo(Portal);
