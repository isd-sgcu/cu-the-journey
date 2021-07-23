import { useRouter } from "solid-app-router";
import {
  Accessor,
  Component,
  createContext,
  createEffect,
  createSignal,
  JSX,
  onMount,
  useContext,
} from "solid-js";
import PreventRoute from "./PreventRoute";
import RouteMapping from "./RouteMapping";

interface ITransitionProvider {
  transitionQueue: Accessor<boolean>;
  scheduleFrame: (num: number, timems: number) => void;
  isAnimated: Accessor<boolean>;
  setAnimated: (val: boolean) => boolean;
  nextAnimationTrigger: () => void;
  resetAnimationFrame: () => void;
  transitionNumber: Accessor<number>;
  fadeOut: (prev: string) => boolean;
  nextScene: Accessor<string>;
  setNextScene: (prev: string) => string;
  setMaxFrame: (v: number | ((prev: number) => number)) => number;
}

interface ITransitionFadeProp extends JSX.HTMLAttributes<HTMLDivElement> {
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
  const [isPrevented, setPrevented] = createSignal<boolean>(true);
  const [router, { push }] = useRouter()!;

  const resetAnimationFrame = () => {
    setTransitionNumber(0);
    setTransitionQueue(false);
    setAnimated(false);
    setFrame(0);
    setTime(0);
    setMaxFrame(0);
    setNextScene("");
    setNowTransition(-1);

    setPrevented(PreventRoute.indexOf(router.current[0].path) !== -1);
  };

  const nextAnimationTrigger = () => {
    const nowNum = transitionNumber();

    if (isPrevented()) {
      if (nowNum === fadeOutNumber) {
        setTransitionNumber(fadeOutFinishNumber);
      } else if (nowNum < maxFrame()) {
        if (nowNum + 1 === maxFrame()) {
          setAnimated(false);
        }
        setTransitionNumber(prev => prev + 1);
      }
    } else if (!isPrevented()) {
      if (transitionNumber() === maxFrame()) {
        setTransitionNumber(fadeOutNumber);
      } else if (transitionNumber() === fadeOutNumber) {
        setTransitionNumber(fadeOutFinishNumber);
      } else if (transitionNumber() !== maxFrame()) {
        setTransitionNumber(prev => Math.min(prev + 1, maxFrame()));
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
    } else if (!isPrevented()) {
      nextAnimationTrigger();
    } else if (isPrevented() && frame() !== -1 && frame() !== maxFrame()) {
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
      return true;
    }
    return false;
  };

  createEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Now path", router.current[0].path);
    resetAnimationFrame();
  });

  createEffect(() => {
    if (transitionNumber() === -2) {
      const nowRoute = router.current[0].path;
      if (!isPrevented() || RouteMapping[nowRoute] || !nextScene()) {
        push(RouteMapping[nowRoute]);
      } else {
        push(nextScene());
      }
      setTransitionNumber(0);
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
        resetAnimationFrame,
      }}
    >
      <div
        onClick={el => {
          el.stopPropagation();
          if (transitionNumber() !== -1 || !isPrevented()) {
            clickAction();
          }
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

  const [router, { push }] = useRouter()!;
  const { setAnimated, transitionNumber, nextScene, setMaxFrame } = useTransitionContext();
  const isPrevented = PreventRoute.indexOf(router.current[0].path) !== -1;
  const newOrder = isPrevented ? order + 1 : order;

  onMount(() => setMaxFrame(prev => Math.max(prev, newOrder)));

  return (
    <div
      onAnimationStart={() => setAnimated(true)}
      onAnimationEnd={() => {
        setAnimated(false);

        const isFadeOut = transitionNumber() === fadeOutNumber;
        if (isFadeOut) {
          const nowRoute = router.current[0].path;
          if (!isPrevented || RouteMapping[nowRoute] || !nextScene()) {
            push(RouteMapping[nowRoute]);
          } else {
            push(nextScene());
          }
        }
      }}
      style={{ opacity: transitionNumber() >= order ? 1 : 0 }}
      class={`${transitionNumber() === order ? "animate-fadeIn" : ""} ${
        transitionNumber() === -1 ? "animate-fadeOut" : ""
      } w-full h-full flex justify-center items-center flex-col`}
      {...props}
    >
      {props.children}
    </div>
  );
};
