import { createSignal, createEffect, Show, Component, For, Accessor } from "solid-js";
import Button from "./common/Button";
import InputBox from "./common/InputBox";

import "../styles/scrollbar.css";
import { saveMessage, StorableKeys } from "../MessageStore";
import { useTransitionContext } from "../context/TransitionContext";

export { StorableKeys };

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
  storeKey: StorableKeys;
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
  const { cancelPrevented } = useTransitionContext();

  createEffect(() => {
    setIsButtonShown(textGetter().trim() !== "");
  });

  const [isGoingNextScene, setIsGoingNextScene] = createSignal(false);

  const proceed = () => {
    saveMessage(storeKey, textGetter());
    if (onButtonClicked) onButtonClicked();
    setIsButtonShown(false);
    setIsGoingNextScene(true);
    cancelPrevented();
  };

  const sceneWithoutLink = (
    <div class="flex h-screen justify-center items-center flex-col space-y-[25px]">
      <div class="text-purple text-[24px] text-center leading=[38px] tracking-[2%] font-BaiJam font-bold">
        <Show
          when={typeof orderKeys === "string"}
          fallback={<For each={orderKeys as string[]}>{key => <h5>{t(key)}</h5>}</For>}
        >
          <h5>{t(orderKeys as string)}</h5>
        </Show>
      </div>
      <InputBox
        isGoingNextScene={isGoingNextScene}
        placeHolder={placeHolder}
        signal={[textGetter, textSetter]}
        isMinimized={isMinimized || false}
      />
      <Show
        when={isButtonShown()}
        // 40px below is the height of the button
        fallback={() => (
          <h5 class="block h-[40px]">{isGoingNextScene() ? `<< ${t(onTapTextKey)} >>` : ""}</h5>
        )}
      >
        <Button children={t(buttonTextKey)} onClick={proceed} />
      </Show>
    </div>
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
