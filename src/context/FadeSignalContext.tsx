import { useRouter } from "solid-app-router";
import { Accessor, createContext, createEffect, createSignal, useContext } from "solid-js";

interface IFadeSignalContext {
  current: Accessor<string>;
  setCurrent: (p: string) => string;
}

const FadeSignalContext = createContext<IFadeSignalContext>();

export function FadeSignalProvider(props: { children: any }) {
  const { pathname, search } = window.location;
  const [current, setCurrent] = createSignal(pathname + search);
  const [router] = useRouter()!;

  createEffect(() => {
    const nowRoute = router.current[0];
    let mainRoute = nowRoute.path;

    if (typeof router.query.number === "string") {
      mainRoute += `?number=${router.query.number}`;
    }

    setCurrent(mainRoute);
  });

  return (
    <FadeSignalContext.Provider value={{ current, setCurrent }}>
      {props.children}
    </FadeSignalContext.Provider>
  );
}

export const useFadeSignal = () => useContext(FadeSignalContext)!;
