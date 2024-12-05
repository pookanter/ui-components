import React from "react";
import { POPPER_NAME, usePopperContext } from "./PopperContext";

interface PopperAnchorProps {
  children: React.ReactNode;
}

type PopperAnchorElement = React.ElementRef<React.ForwardRefExoticComponent<HTMLDivElement>>;

const PopperAnchor: React.FunctionComponent<PopperAnchorProps> = (props) => {
  const { children } = props;
  const ref = React.useRef<PopperAnchorElement>(null);
  const context = usePopperContext(POPPER_NAME);

  React.useEffect(() => {
    context.onAnchorChange$.next(ref.current);
  });

  return <div ref={ref}>{children}</div>;
};

export default PopperAnchor;
