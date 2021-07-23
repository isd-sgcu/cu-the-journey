import { useRouter } from "solid-app-router";
import {
  Accessor,
  Component,
  createContext,
  createEffect,
  createSignal,
  onMount,
  useContext
} from "solid-js";
import PreventRoute from "./PreventRoute";

interface ITransitionProvider {
  transitionQueue: Accessor<boolean>;
  scheduleFrame: (num: number, timems: number) => void;
  isAnimated: Accessor<boolean>;
  setAnimated: (val: boolean) => boolean;
  nextAnimationTrigger: () => void;
  resetAnimationFrame: () => void;
  transitionNumber: Accessor<number>;
  fadeOut: (prev: string) => void;
  nextScene: Accessor<string>;
  setNextScene: (prev: string) => string;
  setMaxFrame: (v: number | ((prev: number) => number)) => number;
}

interface ITransitionFadeProp {
  order: number;
}

const TransitionContext = createContext<ITransitionProvider>();
const fadeOutNumber = -1;
const fadeOutFinishNumber = -2;

export const TransitionProvider: Component = props => {
  const [transitionNumber, setTransitionNumber] = createSignal(0);
  const [isAnimated, setAnimated] = createSignal(false);
  const [transitionQueue, setTransitionQueue] = createSignal(false);
  const [nextScene, setNextScene] = createSignal("");
  const [frame, setFrame] = createSignal(0);
  const [time, setTime] = createSignal(0);
  const [maxFrame, setMaxFrame] = createSignal(0);
  const [nowTransition, setNowTransition] = createSignal<number>(-1);
  const [router, { push }] = useRouter()!;

  const resetAnimationFrame = () => {
    setTransitionNumber(0);
    setTransitionQueue(false);
    setFrame(0);
    setTime(0);
    setMaxFrame(0);
    setNextScene("");
  };

  const nextAnimationTrigger = () => {
    const isPrevented = PreventRoute.indexOf(router.current[0].path) !== -1;
    const maxFrameAnimation = maxFrame();
    const nowNum = transitionNumber();

    if (isPrevented) {
      if (nowNum === fadeOutNumber) {
        setTransitionNumber(fadeOutFinishNumber);
      } else if (nowNum !== maxFrameAnimation) {
        setTransitionNumber(prev => Math.min(prev + 1, maxFrameAnimation));
      }
    } else if (!isPrevented) {
      if (transitionNumber() === maxFrameAnimation) {
        setTransitionNumber(fadeOutNumber);
      } else if (transitionNumber() === fadeOutNumber) {
        setTransitionNumber(fadeOutFinishNumber);
      } else if (transitionNumber() !== maxFrameAnimation) {
        setTransitionNumber(prev => Math.min(prev + 1, maxFrameAnimation));
      }
    }
  };

  const scheduleFrameHelper = (num: number, timems: number) => {
    setFrame(num);
    if (num > 0) {
      const timeOut = window.setTimeout(() => {
        nextAnimationTrigger();
        scheduleFrameHelper(num - 1, timems);
      }, timems);

      setNowTransition(timeOut);
    } else {
      setTransitionQueue(false);
      setNowTransition(-1);
    }
  };

  const clickAction = () => {
    const timeOutId = nowTransition();
    if (timeOutId !== -1) {
      clearTimeout(timeOutId);

      window.setTimeout(() => {
        nextAnimationTrigger();
        scheduleFrameHelper(frame() - 1, time());
      }, 0);
    } else {
      nextAnimationTrigger();
    }
  };

  const scheduleFrame = (num: number, timems: number) => {
    const newNum = Math.max(num, 0);
    const newTimes = Math.max(timems, 0);

    setFrame(newNum);
    setTime(newTimes);

    setTransitionQueue(true);
    scheduleFrameHelper(newNum, newTimes);
  };

  const fadeOut = (next: string) => {
    if (
      transitionNumber() !== -1 &&
      !transitionQueue() &&
      !isAnimated() &&
      next !== router.current[0].path
    ) {
      setNextScene(next);
      setTransitionNumber(-1);
    }
  };

  createEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Now path", router.current[0].path);
    resetAnimationFrame();
  });

  createEffect(() => {
    if (transitionNumber() === -2) {
      push(nextScene());
    }
  });

  return (
    <TransitionContext.Provider
      value={{
        transitionQueue,
        isAnimated,
        setAnimated,
        nextScene,
        setNextScene,
        setMaxFrame,
        fadeOut,
        scheduleFrame,
        nextAnimationTrigger,
        transitionNumber,
        resetAnimationFrame
      }}
    >
      <div
        onClick={el => {
          el.stopPropagation();
          clickAction();
        }}
      >
        {props.children}
      </div>
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = (isReset?: boolean) => {
  const contextValue = useContext(TransitionContext)!;
  if (isReset) {
    contextValue.resetAnimationFrame();
  }
  return contextValue;
};

export const TransitionFade: Component<ITransitionFadeProp> = props => {
  const { order: propsOrder } = props;
  const order = Math.max(0, propsOrder);

  const [, { push }] = useRouter()!;
  const { setAnimated, transitionNumber, nextScene, setMaxFrame } = useTransitionContext();

  onMount(() => setMaxFrame(prev => Math.max(prev, order)));

  return (
    <div
      onAnimationStart={() => setAnimated(true)}
      onAnimationEnd={() => {
        setAnimated(false);

        const isFadeOut = transitionNumber() === fadeOutNumber;
        if (isFadeOut) {
          push(nextScene());
        }
      }}
      style={{ opacity: transitionNumber() >= order ? 1 : 0 }}
      class={`${transitionNumber() === order ? "animate-fadeIn" : ""} ${
        transitionNumber() === -1 ? "animate-fadeOut" : ""
      } w-full h-full flex justify-center items-center flex-col`}
    >
      {props.children}
    </div>
  );
};
