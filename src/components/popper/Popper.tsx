import React from "react";
import { PopperProvider, ScopedProps } from "./PopperContext";
import { ReplaySubject } from "rxjs";
import { Measurable } from "@util/rect";

interface PopperProps {
  anchorChange$?: ReplaySubject<Measurable | null>;
  children: React.ReactNode;
}

const POPPER_NAME = "Popper";

const Popper: React.FunctionComponent<ScopedProps<PopperProps>> = (props) => {
  const { __scopePopper, children } = props;
  const anchorChange$ = new ReplaySubject<Measurable | null>(1);

  return (
    <PopperProvider scope={__scopePopper} anchorChange$={anchorChange$}>
      {children}
    </PopperProvider>
  );
};

Popper.displayName = POPPER_NAME;

export default Popper;
