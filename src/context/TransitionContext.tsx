import { useRouter } from "solid-app-router";
import {
  Accessor,
  batch,
  Component,
  createContext,
  createEffect,
  createSignal,
  JSX,
  useContext,
} from "solid-js";
import { useFadeSignal } from "./FadeSignalContext";
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
  setNextTransition: () => void;
  cancelPrevented: () => void;
}

interface ITransitionFadeProp extends JSX.HTMLAttributes<HTMLDivElement> {
  order: number;
}

interface IRouting extends JSX.HTMLAttributes<HTMLDivElement> {
  href: string;
}

const TransitionContext = createContext<ITransitionProvider>();
const fadeOutNumber = -1;
const fadeOutFinishNumber = -2;

export const TransitionProvider: Component = props => {
  const [transitionNumber, setTransitionNumber] = createSignal(0);
  const [isAnimated, setAnimated] = createSignal(false);
  const [transitionQueue, setTransitionQueue] = createSignal(false);
  const [nextScene, setNextScene] = createSignal("/");
  const [frame, setFrame] = createSignal(0);
  const [time, setTime] = createSignal(0);
  const [maxFrame, setMaxFrame] = createSignal(1);
  const [nowTransition, setNowTransition] = createSignal<number>(-1);
  const [isPrevented, setPrevented] = createSignal<boolean>(true);
  const [isFadeOut, setFadeOut] = createSignal(false);

  const [router, { replace }] = useRouter()!;
  const { setCurrent } = useFadeSignal()!;

  // Reset all state that used in this context
  const resetAnimationFrame = () => {
    batch(() => {
      setTransitionNumber(0);
      setTransitionQueue(false);
      setAnimated(false);
      setFrame(0);
      setTime(0);
      setMaxFrame(1);
      setNextScene("");
      setNowTransition(-1);
      setFadeOut(false);

      setPrevented(PreventRoute.indexOf(router.current[0].path) !== -1);
    });
  };

  const setNextTransition = () => {
    if (time() === 0 || (time() !== 0 && frame() === 0)) {
      setTransitionNumber(prev => Math.min(prev + 1, maxFrame()));
    }
  };

  // Trigger the next frame animation
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
        const nowRoute = router.current[0].path;

        setCurrent(RouteMapping[nowRoute]);
        setTransitionNumber(fadeOutNumber);
      } else if (transitionNumber() === fadeOutNumber) {
        setTransitionNumber(fadeOutFinishNumber);
      } else if (transitionNumber() < maxFrame()) {
        setTransitionNumber(prev => Math.min(prev + 1, maxFrame()));
      }
    }
  };

  // This is where sequencial transition begin
  // If the frame is still remaining then make the timeout
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

  // Handle the click event
  const clickAction = () => {
    const timeOutId = nowTransition();

    if (timeOutId !== -1) {
      clearTimeout(timeOutId);

      nextAnimationTrigger();
      scheduleFrameHelper(frame() - 1, time());
    } else if (!isPrevented()) {
      nextAnimationTrigger();
    } else if (isPrevented() && frame() !== maxFrame()) {
      nextAnimationTrigger();
    }
  };

  // This function will be called to setup before scheduleFrameHelper
  const scheduleFrame = (num: number, timems: number) => {
    const newNum = Math.max(num, 0);
    const newTimes = Math.max(timems, 0);

    setMaxFrame(newNum + 1);
    setFrame(newNum);
    setTime(newTimes);

    setTransitionQueue(true);
    scheduleFrameHelper(newNum, newTimes);
  };

  // Provide fade out and push to next scene
  const fadeOut = (next: string) => {
    if (
      transitionNumber() !== -1 &&
      !transitionQueue() &&
      !isAnimated() &&
      next !== router.current[0].path
    ) {
      setCurrent(next);
      setNextScene(next);
      setTransitionNumber(fadeOutNumber);
      setFadeOut(true);
      return true;
    }
    return false;
  };

  const cancelPrevented = () => {
    setPrevented(false);
  };

  // Reset all state when routes to new path
  createEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Now path", router.current[0].path);
    resetAnimationFrame();
  });

  // Listen when transitionNumber equals to fadeOutFinishNumber
  createEffect(() => {
    if (transitionNumber() === fadeOutFinishNumber) {
      const nowRoute = router.current[0].path;
      if (RouteMapping[nowRoute]) {
        replace(RouteMapping[nowRoute]);
      } else {
        replace(nextScene());
      }

      // Prevent Race condition
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
        fadeOut,
        scheduleFrame,
        nextAnimationTrigger,
        transitionNumber,
        resetAnimationFrame,
        setNextTransition,
        cancelPrevented,
      }}
    >
      <div
        onClick={el => {
          el.stopPropagation();
          if (
            (transitionNumber() === -1 && !isFadeOut()) ||
            transitionNumber() !== -1 ||
            !isPrevented()
          ) {
            clickAction();
          } else if (isFadeOut()) {
            setFadeOut(false);
          }
        }}
        class={`w-full flex flex-grow items-center px-6 xs:px-5 flex-col ${
          !isPrevented() ? "cursor-pointer" : "cursor-default"
        }`}
      >
        {props.children}
      </div>
    </TransitionContext.Provider>
  );
};

// This function is created for simplified syntax and some setup
export const useTransitionContext = (isReset?: boolean) => {
  const contextValue = useContext(TransitionContext)!;
  if (isReset) {
    contextValue.resetAnimationFrame();
  }
  return contextValue;
};

// The wrapper for wrapping the component that want to fade (By default is wrapping at the root component)
// Need to specify parameter "order" for ordering component displaying
export const TransitionFade: Component<ITransitionFadeProp> = props => {
  const { order: propsOrder } = props;
  const order = Math.max(0, propsOrder);

  const [router, { replace }] = useRouter()!;
  const { setAnimated, transitionNumber, nextScene, setNextTransition } = useTransitionContext();

  return (
    <div
      onAnimationStart={() => setAnimated(true)}
      onAnimationEnd={el => {
        setAnimated(false);

        if (el.animationName === "fadeIn") {
          setNextTransition();
        }

        const isFadeOut = transitionNumber() === fadeOutNumber;
        if (isFadeOut) {
          const nowRoute = router.current[0].path;
          if (RouteMapping[nowRoute]) {
            replace(RouteMapping[nowRoute]);
          } else {
            replace(nextScene());
          }
        }
      }}
      style={{ opacity: transitionNumber() >= order ? 1 : 0 }}
      class={`${transitionNumber() === order ? "animate-fadeIn" : ""} ${
        transitionNumber() === -1 ? "animate-fadeOut" : ""
      } w-full flex-grow flex justify-center items-center flex-col`}
      {...props}
    >
      {props.children}
    </div>
  );
};

export function Routing(props: IRouting) {
  const { fadeOut } = useTransitionContext();
  return (
    <div {...props} onClick={() => fadeOut(props.href)}>
      {props.children}
    </div>
  );
}
