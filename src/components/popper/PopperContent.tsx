import React from "react";
import { Measurable, POPPER_NAME, usePopperContext } from "./PopperContext";
import { filter, Observable, skip, Subscription } from "rxjs";
import Portal from "@components/portal/Portal";

interface PopperContentProps {
  children: React.ReactNode;
  position?: "top" | "bottom";
}

type PopperContentElement = HTMLDivElement;

const PopperContent: React.FunctionComponent<PopperContentProps> = (props) => {
  const { children, position = "bottom" } = props;
  const ref = React.useRef<PopperContentElement>(null);
  const context = usePopperContext(POPPER_NAME);
  const subscriptions: Subscription[] = [];

  const calculatePosition = (m: Measurable | null) => {
    if (!m || !ref.current) {
      return;
    }

    const { top, left, bottom } = m.getBoundingClientRect();
    const adjustedTop = top + window.scrollY - ref.current.offsetHeight;
    const adjustedLeft = left + window.scrollX;
    const adjustedBottom = bottom + window.scrollY;
    ref.current.style.right = "auto";
    ref.current.style.bottom = "auto";
    ref.current.style.left = `${adjustedLeft}px`;

    if (position === "bottom") {
      if (bottom + ref.current.offsetHeight > window.innerHeight) {
        ref.current.style.top = `${adjustedTop}px`;
      } else {
        ref.current.style.top = `${adjustedBottom}px`;
      }
    } else if (position === "top") {
      if (top - ref.current.offsetHeight < 0) {
        ref.current.style.top = `${adjustedBottom}px`;
      } else {
        ref.current.style.top = `${adjustedTop}px`;
      }
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      const intersectionObserver$ = new Observable<IntersectionObserverEntry>((subscriber) => {
        const observer = new IntersectionObserver(([entry]) => subscriber.next(entry));

        if (ref.current) {
          console.log("PopperContent is observing");
          observer.observe(ref.current);
        }

        return () => observer && observer.disconnect();
      }).pipe(
        // Skip the first event to avoid initial rendering issues
        skip(1),
        filter((entry) => !entry.isIntersecting)
      );

      subscriptions.push(
        context.onAnchorChange$.subscribe(calculatePosition),
        intersectionObserver$.subscribe(() => calculatePosition(context.anchor))
      );
    }, 0);

    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  });

  return (
    <Portal>
      <div ref={ref} style={{ position: "absolute" }}>
        {children}
      </div>
    </Portal>
  );
};

export default PopperContent;
