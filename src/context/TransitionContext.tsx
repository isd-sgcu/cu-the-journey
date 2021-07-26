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
import { preventScenesSkipping } from "../preventScene2Skipping";
import { saveMessage, StorableKeys } from "../MessageStore";
import { useFadeSignal } from "./FadeSignalContext";
import PreventRoute from "./PreventRoute";
import RouteMapping from "./RouteMapping";

interface ITransitionProvider {
  scheduleFrame: (num: number) => void;
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
  maxFrame: Accessor<number>;
}

interface ITransitionFadeProp extends JSX.HTMLAttributes<HTMLDivElement> {
  order: number;
  isOuter?: boolean;
}

interface IRouting extends JSX.HTMLAttributes<HTMLDivElement> {
  href: string;
}

const TransitionContext = createContext<ITransitionProvider>();
const fadeOutNumber = -1;
const fadeOutFinishNumber = -2;

const elem = document.getElementById("app") as HTMLElement & {
  mozRequestFullScreen(): Promise<void>;
  webkitRequestFullscreen(): Promise<void>;
  msRequestFullscreen(): Promise<void>;
};

const fullScreen = () => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
};

export const TransitionProvider: Component = props => {
  const [transitionNumber, setTransitionNumber] = createSignal(0);
  const [isAnimated, setAnimated] = createSignal(false);
  const [nextScene, setNextScene] = createSignal("/");
  const [maxFrame, setMaxFrame] = createSignal(1);
  const [isPrevented, setPrevented] = createSignal<boolean>(true);
  const [isFadeOut, setFadeOut] = createSignal(false);
  const [isFullScreen, setFullScreen] = createSignal(true);

  const [router, { push }] = useRouter()!;
  const { setCurrent } = useFadeSignal()!;

  // Reset all state that used in this context
  const resetAnimationFrame = () => {
    batch(() => {
      setTransitionNumber(0);
      setAnimated(false);
      setMaxFrame(1);
      setNextScene("");
      setFadeOut(false);

      setPrevented(PreventRoute.indexOf(router.current[0].path) !== -1);
    });
  };

  const setNextTransition = () => {
    setTransitionNumber(prev => Math.min(prev + 1, maxFrame()));
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
        setNextTransition();
      }
    } else if (!isPrevented()) {
      if (transitionNumber() === maxFrame()) {
        const nowRoute = router.current[0].path;

        setCurrent(RouteMapping[nowRoute]);
        setTransitionNumber(fadeOutNumber);
      } else if (transitionNumber() === fadeOutNumber) {
        setTransitionNumber(fadeOutFinishNumber);
      } else if (transitionNumber() < maxFrame()) {
        setNextTransition();
      }
    }
  };

  // Handle the click event
  const clickAction = () => {
    if (!isPrevented()) {
      nextAnimationTrigger();
    } else if (isPrevented() && transitionNumber() !== maxFrame()) {
      nextAnimationTrigger();
    }
  };

  // This function will be called to setup before scheduleFrameHelper
  const scheduleFrame = (num: number) => {
    const newNum = Math.max(num, 0);

    setMaxFrame(newNum * 2 + 1);
  };

  // Provide fade out and push to next scene
  const fadeOut = (next: string) => {
    if (transitionNumber() !== -1 && !isAnimated() && next !== router.current[0].path) {
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

  const saveCurrentPath = (path: string) => {
    saveMessage(StorableKeys.CurrentPath, path);
    if (path === "/" || path === "*all") return;
    saveMessage(StorableKeys.LastSeenPath, path);
  };

  // Reset all state when routes to new path
  createEffect(() => {
    const currentPath = router.current[0].path;
    preventScenesSkipping(currentPath);
    saveCurrentPath(currentPath);
    resetAnimationFrame();
  });

  // Listen when transitionNumber equals to fadeOutFinishNumber
  createEffect(() => {
    if (transitionNumber() === fadeOutFinishNumber) {
      const nowRoute = router.current[0].path;
      if (nextScene() !== "") {
        push(nextScene());
      } else {
        push(RouteMapping[nowRoute]);
      }

      // Prevent Race condition
      setTransitionNumber(0);
    }
  });

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
        resetAnimationFrame,
        setNextTransition,
        cancelPrevented,
        maxFrame,
      }}
    >
      <div
        onClick={el => {
          el.stopPropagation();
          if (isFullScreen()) {
            fullScreen();
            setFullScreen(false);
          }
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
  const { order: propsOrder, isOuter } = props;
  const { setAnimated, transitionNumber, nextScene, setNextTransition, maxFrame } =
    useTransitionContext();

  const order = Math.max(0, propsOrder * 2);

  const [router, { push }] = useRouter()!;
  return (
    <div
      onAnimationStart={() => setAnimated(true)}
      onAnimationEnd={el => {
        setAnimated(false);

        if (el.animationName === "fadeIn" && (!isOuter || maxFrame() === 1)) {
          setNextTransition();
        }

        const isFadeOut = transitionNumber() === fadeOutNumber;
        if (isFadeOut) {
          const nowRoute = router.current[0].path;
          if (nextScene() !== "") {
            push(nextScene());
          } else {
            push(RouteMapping[nowRoute]);
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
