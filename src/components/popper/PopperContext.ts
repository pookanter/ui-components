import { createContext } from "@components/context";
import { ReplaySubject } from "rxjs";

export type Measurable = { getBoundingClientRect(): DOMRect };

type PopperContextType = {
  anchorChange$: ReplaySubject<Measurable | null>;
};

const POPPER_NAME = "Popper";
const [PopperProvider, usePopperContext] = createContext<PopperContextType>(POPPER_NAME);

export { POPPER_NAME, PopperProvider, usePopperContext };
