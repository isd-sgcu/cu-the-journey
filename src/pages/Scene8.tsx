import { Component, createEffect, createSignal, Show } from "solid-js";
import { Link } from "solid-app-router";
import { NextScene } from "../components/JumpTo";
import TextComponent from "../components/Text";
import InputBox from "../components/common/InputBox";
import Button from "../components/common/Button";
import { useTranslation } from "../config/i18n";

const { TextMiddle } = TextComponent;

function t(JSONkey: string) {
  const [translate] = useTranslation("scene8");
  return translate(JSONkey);
}

const Scene8S0: Component = () => (
  <>
    <NextScene page="/8-1-0">
      <TextMiddle text={t("8-0")} />
    </NextScene>
  </>
);

const Scene8S1S0: Component = () => (
  <>
    <NextScene page="/8-1-1">
      <TextMiddle text={t("8-1-0")} />
    </NextScene>
  </>
);

const Scene8S1S1: Component = () => (
  <>
    <NextScene page="/8-1-2">
      <TextMiddle text={t("8-1-1")} />
    </NextScene>
  </>
);

const Scene8S1S2: Component = () => (
  <>
    <NextScene page="/8-2">
      <TextMiddle text={t("8-1-2")} />
    </NextScene>
  </>
);

const Scene8S2: Component = () => {
  const placeHolder = t("8-2-placeholder");
  const [text, setText] = createSignal("");
  const [isButtonShown, setIsButtonShown] = createSignal(false);
  createEffect(() => {
    setIsButtonShown(text() !== "");
  });
  const [isGoingNextScene, setIsGoingNextScene] = createSignal(false);
  const nextPage = "/9-0";

  const proceed = () => {
    setIsButtonShown(false);
    setIsGoingNextScene(true);
  };

  const sceneWithoutLink = (
    <div class="flex h-screen justify-center items-center flex-col space-y-[25px]">
      <div class="text-purple text-[24px] text-center leading=[38px] tracking-[2%] font-BaiJam font-bold">
        <h5>{t("8-2-order")}</h5>
      </div>
      <InputBox
        isGoingNextScene={isGoingNextScene}
        placeHolder={placeHolder}
        signal={[text, setText]}
      />
      <Show
        when={isButtonShown()}
        fallback={() => (
          <h5 class="block h-[40px]">
            {isGoingNextScene() ? `<< ${t("8-2-tap-proceed")} >>` : ""}
          </h5>
        )}
      >
        <Button children={t("8-2-button-text")} onClick={proceed} />
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

export default {
  Scene8S0,
  Scene8S1S0,
  Scene8S1S1,
  Scene8S1S2,
  Scene8S2
};
