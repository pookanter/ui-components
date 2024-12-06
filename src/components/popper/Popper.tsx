import React from "react";
import { Measurable, PopperProvider } from "./PopperContext";
import { ReplaySubject } from "rxjs";

interface PopperProps {
  children: React.ReactNode;
}

const Popper: React.FunctionComponent<PopperProps> = (props) => {
  const { children } = props;
  const onAnchorChange$ = new ReplaySubject<Measurable | null>();

  return (
    <PopperProvider anchorChange$={onAnchorChange$}>
      {children}
    </PopperProvider>
  );
};

export default Popper;
