import React from "react";
import { ScopedProps, SelectProvider, usePopperScope } from "./SelectContext";
import * as Popper from "@components/popper";
import { ReplaySubject } from "rxjs";

interface SelectProps {
  children?: React.ReactNode;
}

const Select: React.FunctionComponent<ScopedProps<SelectProps>> = (props) => {
  const { __scopeSelect, children } = props;
  const openChange$ = new ReplaySubject<boolean>();
  const popperScope = usePopperScope(__scopeSelect);

  return (
    <Popper.Root {...popperScope}>
      <SelectProvider scope={__scopeSelect} openChange$={openChange$}>
        {children}
      </SelectProvider>
    </Popper.Root>
  );
};

export default Select;
