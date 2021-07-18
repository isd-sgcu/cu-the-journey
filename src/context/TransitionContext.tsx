import { useRouter } from "solid-app-router";
import {
  splitProps,
  Accessor,
  Component,
  createContext,
  createEffect,
  createSignal,
  useContext
} from "solid-js";

interface ITransitionProvider {
  nextAnimationTrigger: () => void;
  resetAnimationFrame: () => void;
  transitionNumber: Accessor<number>;
}

interface ITransitionFadeProp {
  order: number;
}

const TransitionContext = createContext<ITransitionProvider>();

export const TransitionProvider: Component = props => {
  const [transitionNumber, setTransitionNumber] = createSignal(0);
  const [router] = useRouter();

  createEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Now path", router.current[0].path);
    setTransitionNumber(0);
  });

  const nextAnimationTrigger = () => {
    setTransitionNumber(prev => prev + 1);
  };

  const resetAnimationFrame = () => {
    setTransitionNumber(0);
  };

  return (
    <TransitionContext.Provider
      value={{ nextAnimationTrigger, transitionNumber, resetAnimationFrame }}
    >
      {props.children}
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = () => useContext(TransitionContext);

export const TransitionFade: Component<ITransitionFadeProp> = props => {
  const { order } = props;
  const [local] = splitProps(useTransitionContext(), ["transitionNumber"]);
  return (
    <div
      style={{ opacity: local.transitionNumber() >= order ? 1 : 0 }}
      class={`${local.transitionNumber() >= order ? "animate-fadeIn" : ""}`}
    >
      {props.children}
    </div>
  );
};
