import type { Component } from "solid-js";
import { NextScene } from "../components/JumpTo";
import TextComponent from "../components/Text";
import { sceneTranslator } from "../config/i18n";
import InputBoxScene, { InputBoxScenePropsType, StorableKeys } from "../components/InputBoxScene";

const { TextMiddle } = TextComponent;

const t = sceneTranslator("scene6");

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
  const props: InputBoxScenePropsType = {
    isMinimized: false,
    placeHolderKey: "6-3-placeholder",
    nextPage: "/6-4",
    orderKeys: ["6-3-first-line", "6-3-second-line"],
    buttonTextKey: "6-3-button-text",
    onTapTextKey: "6-3-tap-proceed",
    storeKey: StorableKeys.Scene6S3,
    t,
  };
  return <InputBoxScene {...props} />;
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
  Scene6S4,
};

export default Scene6;
