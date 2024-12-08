import React from "react";
import { ScopedProps, usePopperScope, useSelectContext } from "./SelectContext";
import PopperContent from "@components/popper/PopperContent";
import { map, Subscription } from "rxjs";
interface SelectContentProps {
  children?: React.ReactNode;
}

const CONTENT_NAME = "ContentName";

const SelectContent: React.FunctionComponent<ScopedProps<SelectContentProps>> = (props) => {
  const { __scopeSelect, children } = props;
  const [frag, setFrag] = React.useState<HTMLElement | null>(null);
  const context = useSelectContext(CONTENT_NAME, __scopeSelect);
  const popperScope = usePopperScope(__scopeSelect);
  const openChange$ = context.openChange$.pipe(
    map((open) => {
      if (open) {
        setFrag(document.body);
      } else {
        setFrag(null);
      }
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
    <React.Fragment>
      {frag && (
        <PopperContent {...popperScope} container={frag}>
          {children}
        </PopperContent>
      )}
    </React.Fragment>
  );
};
export default SelectContent;
