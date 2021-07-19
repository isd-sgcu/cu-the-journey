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
  // eslint-disable-next-line no-unused-vars
  scheduleFrame: (num: number, timems: number) => void;
  nextAnimationTrigger: () => void;
  resetAnimationFrame: () => void;
  transitionNumber: Accessor<number>;
}

interface ITransitionFadeProp {
  order: number;
}

// interface ITransitionLinkProp {
//   order: number;
//   href: string;
// }

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

  const scheduleFrame = (num: number, timems: number) => {
    if (num !== 0) {
      setTimeout(() => {
        nextAnimationTrigger();
        scheduleFrame(num - 1, timems);
      }, timems);
    }
  };

  return (
    <TransitionContext.Provider
      value={{ scheduleFrame, nextAnimationTrigger, transitionNumber, resetAnimationFrame }}
    >
      {props.children}
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = () => useContext(TransitionContext);

export const TransitionFade: Component<ITransitionFadeProp> = props => {
  const { order } = props;
  const [nowOpacity, setNowOpacity] = createSignal(0);
  const [local] = splitProps(useTransitionContext(), ["transitionNumber"]);
  return (
    <div
      onAnimationEnd={() => {
        setNowOpacity(1);
      }}
      style={{ opacity: nowOpacity() }}
      class={`${
        local.transitionNumber() >= order ? "animate-fadeIn" : ""
      } flex justify-center items-center flex-col`}
    >
      {props.children}
    </div>
  );
};
