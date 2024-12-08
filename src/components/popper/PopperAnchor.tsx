import React from "react";
import { ScopedProps, usePopperContext } from "./PopperContext";

interface PopperAnchorProps {
  children: React.ReactNode;
}

type PopperAnchorElement = React.ElementRef<React.ForwardRefExoticComponent<HTMLDivElement>>;

const ANCHOR_NAME = "PopperAnchor";

const PopperAnchor: React.FunctionComponent<ScopedProps<PopperAnchorProps>> = (props) => {
  const { __scopePopper, children } = props;
  const ref = React.useRef<PopperAnchorElement>(null);
  const context = usePopperContext(ANCHOR_NAME, __scopePopper);

  React.useEffect(() => {
    context.anchorChange$.next(ref.current);
  });

  return <div ref={ref}>{children}</div>;
};

PopperAnchor.displayName = ANCHOR_NAME;

export default PopperAnchor;
