import { useRouter } from "solid-app-router";
import { Accessor, createContext, createSignal, useContext } from "solid-js";

interface IFadeSignalContext {
  current: Accessor<string>;
  setCurrent: (p: string) => string;
}

const FadeSignalContext = createContext<IFadeSignalContext>();

export function FadeSignalProvider(props: { children: any }) {
  const [router] = useRouter()!;
  const [current, setCurrent] = createSignal(router.current[0].path);
  return (
    <FadeSignalContext.Provider value={{ current, setCurrent }}>
      {props.children}
    </FadeSignalContext.Provider>
  );
}

export const useFadeSignal = () => useContext(FadeSignalContext)!;
