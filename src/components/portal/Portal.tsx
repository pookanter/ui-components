import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom";

const PORTAL_NAME = "Portal";

interface PortalProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: Element | DocumentFragment | null;
  children: React.ReactNode;
}

const Portal: React.FunctionComponent<PortalProps> = (props) => {
  const { container: containerProp, children, ...portalProps } = props;
  const [mounted, setMounted] = React.useState(false);
  useLayoutEffect(() => setMounted(true), []);
  const container = containerProp || (mounted && globalThis?.document?.body);
  return container
    ? ReactDOM.createPortal(<div {...portalProps}>{children}</div>, container)
    : null;
};

Portal.displayName = PORTAL_NAME;

export default Portal;
