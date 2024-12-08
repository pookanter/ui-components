import React from "react";
import { ScopedProps, usePopperScope, useSelectContext } from "./SelectContext";
import { map, Subscription } from "rxjs";
import PopperAnchor from "@components/popper/PopperAnchor";

interface SelectAnchorProps {
  children?: React.ReactNode;
}

type SelectAnchorElement = React.ElementRef<React.ForwardRefExoticComponent<HTMLDivElement>>;

const TRIGGER_NAME = "SelectTrigger";

const SelectTrigger: React.FunctionComponent<ScopedProps<SelectAnchorProps>> = (props) => {
  const { __scopeSelect, children } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const ref = React.useRef<SelectAnchorElement>(null);
  const context = useSelectContext(TRIGGER_NAME, __scopeSelect);
  const popperScope = usePopperScope(__scopeSelect);
  const openChange$ = context.openChange$.pipe(
    map((open) => {
      setOpen(open);
    })
  );
  const subscriptions: Subscription[] = [];

  React.useEffect(() => {
    subscriptions.push(openChange$.subscribe());
    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  });

  return (
    <PopperAnchor {...popperScope}>
      <div ref={ref} onClick={() => context.openChange$.next(!open)}>
        {children}
      </div>
    </PopperAnchor>
  );
};

export default SelectTrigger;
