import {
  createSignal,
  createEffect,
  Show,
  Component,
  For,
  Accessor,
  onMount,
  onCleanup,
} from "solid-js";
import { useRouter } from "solid-app-router";
import Button from "./common/Button";
import InputBox from "./common/InputBox";

import "../styles/scrollbar.css";
import { saveMessage } from "../MessageStore";
import { TransitionFade, useTransitionContext } from "../context/TransitionContext";
import { useScene } from "./AnimationScene";

export type InputBoxScenePropsType = {
  isMinimized?: boolean; // shrink down the height of the textarea
  onButtonClicked?: () => void; // on clicking the save button
  text?: Accessor<string>; // the caller wants to access the text and use it in the upper scope
  setText?: (v: string | ((prev: string) => string)) => string; // eslint-disable-line
  placeHolderKey: string; // placeholder of the textarea
  nextPage: string; // ex. "/9-0"
  orderKeys: string | string[]; // key or array of keys of text lines above the textarea, ex. "8-0-order"
  buttonTextKey: string;
  onTapTextKey: string;
  storeKey: string;
  t: (key: string, params?: Record<string, string>, defaultValue?: string) => string; // eslint-disable-line
};

const InputBoxScene: Component<InputBoxScenePropsType> = props => {
  const {
    isMinimized,
    placeHolderKey,
    orderKeys,
    buttonTextKey,
    onTapTextKey,
    storeKey,
    onButtonClicked,
    t,
    text,
    setText,
  } = props;
  const placeHolder = t(placeHolderKey);
  let textGetter: Accessor<string>;
  let textSetter: (v: string | ((prev: string) => string)) => string; // eslint-disable-line
  if (text === undefined && setText === undefined) [textGetter, textSetter] = createSignal("");
  else {
    textGetter = text as Accessor<string>;
    textSetter = setText as (v: string | ((prev: string) => string)) => string;
  }
  const [isButtonShown, setIsButtonShown] = createSignal(false);
  const { cancelPrevented, scheduleFrame, nextAnimationTrigger, resetAnimationFrame } =
    useTransitionContext();

  createEffect(() => {
    setIsButtonShown(textGetter().trim() !== "");
  });

  const [isGoingNextScene, setIsGoingNextScene] = createSignal(false);

  const [router] = useRouter()!;
  const [showOrderKey, setShowOrderKey] = createSignal(true); // false on /16-0 and /24-0
  const { isLoading } = useScene();
  const isShowOrder = ["/16-0", "/24-0"].includes(router.current[0].path);

  createEffect(() => {
    if (isGoingNextScene() && !isLoading()) {
      if (isShowOrder) {
        setShowOrderKey(false);
      }
    }
  });

  onMount(() => {
    if (isShowOrder) scheduleFrame(1, 1);
  });

  onCleanup(() => resetAnimationFrame());

  const proceed = () => {
    saveMessage(storeKey, textGetter());
    if (onButtonClicked) onButtonClicked();
    setIsButtonShown(false);
    setIsGoingNextScene(true);
    if (isShowOrder) nextAnimationTrigger();
    cancelPrevented();
  };

  const sceneWithoutLink = (
    <>
      <div class="relative flex flex-col flex-grow max-w-[327px] xs:max-w-[300px] justify-center items-center z-10 space-y-[24px] purple">
        <div class="text-purple text-[24px] text-center leading=[38px] tracking-[2%] font-BaiJam font-bold">
          <Show when={showOrderKey()} fallback={<div class="h-[29px]"></div>}>
            <Show
              when={typeof orderKeys === "string"}
              fallback={<For each={orderKeys as string[]}>{key => <h5>{t(key)}</h5>}</For>}
            >
              <h5>{t(orderKeys as string)}</h5>
            </Show>
          </Show>
        </div>
        {/* To push down "Tap to continue" */}
        <Show when={!showOrderKey()}>
          <div class="h-20"> </div>
          <div class="absolute w-screen flex justify-center -z-10">
            <TransitionFade order={1}>
              <img
                class="w-[350px] max-w-full"
                style="top: -50px;"
                src={`images/screen/post-${router.current[0].path === "/16-0" ? "pp" : "yl"}-1.png`}
              />
            </TransitionFade>
          </div>
        </Show>
        <InputBox
          isGoingNextScene={isGoingNextScene}
          placeHolder={placeHolder}
          signal={[textGetter, textSetter]}
          isMinimized={isMinimized || false}
        />
        {/* To push down "Tap to continue" */}
        <Show when={!showOrderKey()}>
          <div class="h-20"> </div>
        </Show>
        <Show
          when={isButtonShown()}
          // 40px below is the height of the button
          fallback={() => (
            <h5
              class={`block h-[40px]`}
              style="text-shadow: 0px 0px 2px #ffffff,0px 0px 2px #ffffff;"
            >
              {isGoingNextScene() ? `<< ${t(onTapTextKey)} >>` : ""}
            </h5>
          )}
        >
          <Button children={t(buttonTextKey)} onClick={proceed} />
        </Show>
      </div>
    </>
  );

  return (
    <>
      <Show
        // Show without link when the button is visible (haven't clicked save yet)
        when={!isGoingNextScene()}
        fallback={() => <div>{sceneWithoutLink}</div>}
      >
        {sceneWithoutLink}
      </Show>
    </>
  );
};

export default InputBoxScene;
