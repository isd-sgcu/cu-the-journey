import { Link } from "solid-app-router";
import { createSignal, createEffect, Show, Component, For } from "solid-js";
import Button from "./common/Button";
import InputBox from "./common/InputBox";

type InputBoxScenePropsType = {
  isMinimized?: boolean; // shrink down the height of the textarea
  placeHolderKey: string; // placeholder of the textarea
  nextPage: string; // ex. "/9-0"
  orderKeys: string | string[]; // key or array of keys of text lines above the textarea, ex. "8-0-order"
  buttonTextKey: string;
  onTapTextKey: string;
  t: (key: string, params?: Record<string, string>, defaultValue?: string) => string; // eslint-disable-line
};

const InputBoxScene: Component<InputBoxScenePropsType> = props => {
  const { isMinimized, placeHolderKey, nextPage, orderKeys, buttonTextKey, onTapTextKey, t } =
    props;
  const placeHolder = t(placeHolderKey);
  const [text, setText] = createSignal("");
  const [isButtonShown, setIsButtonShown] = createSignal(false);
  createEffect(() => {
    setIsButtonShown(text() !== "");
  });
  const [isGoingNextScene, setIsGoingNextScene] = createSignal(false);

  const proceed = () => {
    setIsButtonShown(false);
    setIsGoingNextScene(true);
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
        signal={[text, setText]}
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
        fallback={() => <Link href={nextPage}>{sceneWithoutLink}</Link>}
      >
        {sceneWithoutLink}
      </Show>
    </>
  );
};

export default InputBoxScene;
