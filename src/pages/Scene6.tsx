import { Component, createSignal, Show } from "solid-js";
import { NextScene, PrevScene } from "../components/JumpTo";
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
    <TextMiddle text={t("6-0")} />
    <PrevScene page="/6-0" />
    <NextScene page="/6-1" />
  </>
);

const Scene6S1: Component = () => (
  <>
    <TextMiddle text={t("6-1")} />
    <PrevScene page="/6-0" />
    <NextScene page="/6-2" />
  </>
);

const Scene6S2: Component = () => (
  <>
    <TextMiddle text={t("6-2")} />
    <PrevScene page="/6-1" />
    <NextScene page="/6-3" />
  </>
);

const Scene6S3: Component = () => {
  const placeHolder = t("6-3-placeholder");
  const [text, setText] = createSignal("");

  const [isButtonShown, setIsButtonShown] = createSignal(true);

  const proceed = () => {
    setIsButtonShown(false);
    document.querySelector("body").onclick = () => {
      alert(`Going to the next scene with save text\n${text()}`);
    }; // TODO go to the next scene
  };

  return (
    <>
      <div class="flex h-screen justify-center items-center flex-col space-y-[25px]">
        <div class="text-purple text-[24px] text-center leading=[38px] tracking-[2%] font-BaiJam font-bold">
          <h5>
            {t("6-3-first-line")}
            <br />
            {t("6-3-second-line")}
          </h5>
        </div>
        <InputBox placeHolder={placeHolder} signal={[text, setText]} />
        <Show when={isButtonShown()} fallback={() => <h5>{`<< ${t("6-3-tap-proceed")} >>`}</h5>}>
          <Button children={t("6-3-button-text")} onClick={proceed} />
        </Show>
      </div>
      <PrevScene page="/6-2" />
      <NextScene page="/6-4" />
    </>
  );
};

const Scene6S4: Component = () => (
  <>
    <TextMiddle text={t("6-4")} />
    <PrevScene page="/6-3" />
    <NextScene page="/7-0" />
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
