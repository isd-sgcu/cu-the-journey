import { Component, createEffect, createSignal, Show } from "solid-js";
import { Link } from "solid-app-router";
import { NextScene } from "../components/JumpTo";
import TextComponent from "../components/Text";
import InputBox from "../components/common/InputBox";
import Button from "../components/common/Button";
import { useTranslation } from "../config/i18n";

const { TextMiddle } = TextComponent;

function t(JSONkey: string) {
  const [translate] = useTranslation("scene6");
  return translate(JSONkey);
}
const Scene6S0: Component = () => (
  <>
    <NextScene page="/6-1">
      <TextMiddle text={t("6-0")} />
    </NextScene>
  </>
);

const Scene6S1: Component = () => (
  <>
    <NextScene page="/6-2">
      <TextMiddle text={t("6-1")} />
    </NextScene>
  </>
);

const Scene6S2: Component = () => (
  <>
    <NextScene page="/6-3">
      <TextMiddle text={t("6-2")} />
    </NextScene>
  </>
);

const Scene6S3: Component = () => {
  const placeHolder = t("6-3-placeholder");
  const [text, setText] = createSignal("");
  const [isButtonShown, setIsButtonShown] = createSignal(false);
  createEffect(() => {
    setIsButtonShown(text() !== "");
  });
  const [isGoingNextScene, setIsGoingNextScene] = createSignal(false);
  const nextPage = "/6-4";

  const proceed = () => {
    setIsButtonShown(false);
    setIsGoingNextScene(true);
  };

  const sceneWithoutLink = (
    <div class="flex h-screen justify-center items-center flex-col space-y-[25px]">
      <div class="text-purple text-[24px] text-center leading=[38px] tracking-[2%] font-BaiJam font-bold">
        <h5>
          {t("6-3-first-line")}
          <br />
          {t("6-3-second-line")}
        </h5>
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
            {isGoingNextScene() ? `<< ${t("6-3-tap-proceed")} >>` : ""}
          </h5>
        )}
      >
        <Button children={t("6-3-button-text")} onClick={proceed} />
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

const Scene6S4: Component = () => (
  <>
    <NextScene page="/7-0">
      <TextMiddle text={t("6-4")} />
    </NextScene>
  </>
);

const Scene6 = {
  Scene6S0,
  Scene6S1,
  Scene6S2,
  Scene6S3,
  Scene6S4
};

export default Scene6;
