import React from "react";
import { ScopedProps, usePopperContext } from "./PopperContext";
import { filter, map, merge, Observable, skip, Subscription, tap } from "rxjs";
import Portal from "@components/portal/Portal";
import { Measurable } from "@util/rect";
interface PopperContentProps {
  children?: React.ReactNode;
  container?: HTMLElement;
  position?: "top" | "bottom";
}

type PopperContentElement = HTMLDivElement;

const CONTENT_NAME = "PopperContent";

const PopperContent: React.FunctionComponent<ScopedProps<PopperContentProps>> = (props) => {
  const { __scopePopper, children, container, position = "bottom" } = props;
  const [anchor, setAnchor] = React.useState<Measurable | null>(null);
  const ref = React.useRef<PopperContentElement>(null);
  const context = usePopperContext(CONTENT_NAME, __scopePopper);
  const notIntersect$ = new Observable<IntersectionObserverEntry>((subscriber) => {
    const observer = new IntersectionObserver(([entry]) => subscriber.next(entry));
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }).pipe(
    // Skip the first event to avoid initial rendering issues
    skip(1),
    filter((entry) => !entry.isIntersecting),
    map(() => anchor)
  );
  const positioning$ = merge(
    context.anchorChange$.pipe(tap((measurable) => setAnchor(measurable))),
    notIntersect$
  ).pipe(
    filter((measurable) => !!measurable || !!ref.current),
    map((measurable) => [measurable, ref.current] as [Measurable, HTMLDivElement]),
    map(([measurable, element]) => {
      const { top, left, bottom } = measurable.getBoundingClientRect();
      const adjustedTop = top + window.scrollY - element.offsetHeight;
      const adjustedLeft = left + window.scrollX;
      const adjustedBottom = bottom + window.scrollY;
      element.style.right = "auto";
      element.style.bottom = "auto";
      element.style.left = `${adjustedLeft}px`;
      if (position === "bottom") {
        if (bottom + element.offsetHeight > window.innerHeight) {
          element.style.top = `${adjustedTop}px`;
        } else {
          element.style.top = `${adjustedBottom}px`;
        }
      } else if (position === "top") {
        if (top - element.offsetHeight < 0) {
          element.style.top = `${adjustedBottom}px`;
        } else {
          element.style.top = `${adjustedTop}px`;
        }
      }
    })
  );
  const subscriptions: Subscription[] = [];
  React.useEffect(() => {
    setTimeout(() => {
      subscriptions.push(positioning$.subscribe());
    }, 0);
    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  });
  return (
    <Portal container={container}>
      <div ref={ref} style={{ position: "absolute" }}>
        {children}
      </div>
    </Portal>
  );
};

PopperContent.displayName = CONTENT_NAME;

export default PopperContent;
