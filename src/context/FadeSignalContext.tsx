import { Accessor, createContext, createSignal, useContext } from "solid-js";

interface IFadeSignalContext {
  current: Accessor<string>;
  setCurrent: (p: string) => string;
}

const FadeSignalContext = createContext<IFadeSignalContext>();

export function FadeSignalProvider(props: { children: any }) {
  const { pathname, search } = window.location;
  const [current, setCurrent] = createSignal(pathname + search);
  return (
    <FadeSignalContext.Provider value={{ current, setCurrent }}>
      {props.children}
    </FadeSignalContext.Provider>
  );
}

export const useFadeSignal = () => useContext(FadeSignalContext)!;
