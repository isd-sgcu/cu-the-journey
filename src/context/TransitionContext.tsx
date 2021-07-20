/* eslint-disable no-unused-vars */
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
  scheduleFrame: (num: number, timems: number) => void;
  isAnimated: Accessor<boolean>;
  setAnimated: (val: boolean) => boolean;
  nextAnimationTrigger: () => void;
  resetAnimationFrame: () => void;
  transitionNumber: Accessor<number>;
  fadeOut: (prev: string) => void;
  nextScene: Accessor<string>;
  setNextScene: (prev: string) => string;
}

interface ITransitionFadeProp {
  order: number;
}

const TransitionContext = createContext<ITransitionProvider>();
const fadeOutNumber = -1;

export const TransitionProvider: Component = props => {
  const [transitionNumber, setTransitionNumber] = createSignal(0);
  const [isAnimated, setAnimated] = createSignal(false);
  const [nextScene, setNextScene] = createSignal("");
  const [router] = useRouter();

  const resetAnimationFrame = () => {
    setTransitionNumber(0);
  };

  createEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Now path", router.current[0].path);
    resetAnimationFrame();
  });

  const nextAnimationTrigger = () => {
    setTransitionNumber(prev => prev + 1);
  };

  const scheduleFrame = (num: number, timems: number) => {
    if (num !== 0) {
      setAnimated(true);
      setTimeout(() => {
        nextAnimationTrigger();
        scheduleFrame(num - 1, timems);
      }, timems);
    } else {
      setAnimated(false);
    }
  };

  const fadeOut = (next: string) => {
    if (!isAnimated() && next !== router.current[0].path) {
      setNextScene(next);
      setTransitionNumber(-1);
    }
  };

  return (
    <TransitionContext.Provider
      value={{
        isAnimated,
        setAnimated,
        nextScene,
        setNextScene,
        fadeOut,
        scheduleFrame,
        nextAnimationTrigger,
        transitionNumber,
        resetAnimationFrame
      }}
    >
      {props.children}
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = (isReset?: boolean) => {
  const contextValue = useContext(TransitionContext);
  if (isReset) {
    contextValue.resetAnimationFrame();
  }
  return contextValue;
};

export const TransitionFade: Component<ITransitionFadeProp> = props => {
  const { order: propsOrder } = props;
  const order = Math.max(0, propsOrder);

  const [, { push }] = useRouter();
  const [nowOpacity, setNowOpacity] = createSignal(0);
  const { setAnimated, transitionNumber, nextScene } = useTransitionContext();

  return (
    <div
      onAnimationStart={() => setAnimated(true)}
      onAnimationEnd={() => {
        setAnimated(false);

        const isFadeOut = transitionNumber() === fadeOutNumber;
        setNowOpacity(!isFadeOut ? 1 : 0);
        if (isFadeOut) {
          push(nextScene());
        }
      }}
      style={{ opacity: nowOpacity() }}
      class={`${transitionNumber() >= order ? "animate-fadeIn" : ""} ${
        transitionNumber() === -1 ? "animate-fadeOut" : ""
      } w-full h-full flex justify-center items-center flex-col`}
    >
      {props.children}
    </div>
  );
};
