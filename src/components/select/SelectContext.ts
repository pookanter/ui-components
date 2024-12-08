import { createContextScope, Scope } from "@components/context";
import { createPopperScope } from "@components/popper/PopperContext";
import { ReplaySubject } from "rxjs";

export type ScopedProps<P> = P & { __scopeSelect?: Scope };

export type SelectContextValue = {
  openChange$: ReplaySubject<boolean>;
};

const SELECT_NAME = "Popper";
const [createSelectContext, createSelectScope] = createContextScope(SELECT_NAME);

const [SelectProvider, useSelectContext] = createSelectContext<SelectContextValue>(SELECT_NAME);

const usePopperScope = createPopperScope();

export { SelectProvider, useSelectContext, createSelectScope, usePopperScope };
