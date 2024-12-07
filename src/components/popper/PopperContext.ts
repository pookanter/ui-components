import { createContext } from "@components/context";
import { ReplaySubject } from "rxjs";
import type { Measurable } from "@util/rect";

type PopperContextType = {
  anchorChange$: ReplaySubject<Measurable | null>;
};

const POPPER_NAME = "Popper";
const [PopperProvider, usePopperContext] = createContext<PopperContextType>(POPPER_NAME);

export { POPPER_NAME, PopperProvider, usePopperContext };
