import { createContext } from "@components/context";
import { ReplaySubject } from "rxjs";

export type Measurable = { getBoundingClientRect(): DOMRect };

type PopperContextType = {
  anchor: Measurable | null;
  onAnchorChange$: ReplaySubject<Measurable | null>;
};

const POPPER_NAME = "Popper";
const [PopperProvider, usePopperContext] = createContext<PopperContextType>(POPPER_NAME);

export { POPPER_NAME, PopperProvider, usePopperContext };
