import React from "react";
import { Measurable, PopperProvider } from "./PopperContext";
import { ReplaySubject, Subscription } from "rxjs";

interface PopperProps {
  children: React.ReactNode;
}

const Popper: React.FunctionComponent<PopperProps> = (props) => {
  const { children } = props;
  const [anchor, setAnchor] = React.useState<Measurable | null>(null);
  const subscriptions: Subscription[] = [];
  const onAnchorChange$ = new ReplaySubject<Measurable | null>();

  subscriptions.push(onAnchorChange$.subscribe(setAnchor));

  React.useEffect(() => {
    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, []);

  return (
    <PopperProvider anchor={anchor} onAnchorChange$={onAnchorChange$}>
      {children}
    </PopperProvider>
  );
};

export default Popper;
