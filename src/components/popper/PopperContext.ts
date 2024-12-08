import { createContextScope, Scope } from "@components/context";
import { ReplaySubject } from "rxjs";
import type { Measurable } from "@util/rect";

export type ScopedProps<P> = P & { __scopePopper?: Scope };

export type PopperContextValue = {
  anchorChange$: ReplaySubject<Measurable | null>;
};

const POPPER_NAME = "Popper";
const [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);

const [PopperProvider, usePopperContext] = createPopperContext<PopperContextValue>(POPPER_NAME);

export { PopperProvider, usePopperContext, createPopperScope };
