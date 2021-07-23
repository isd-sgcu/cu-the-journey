import type { Component } from "solid-js";
import TextComponent from "../components/Text";
import { sceneTranslator } from "../config/i18n";
import InputBoxScene, { InputBoxScenePropsType, StorableKeys } from "../components/InputBoxScene";

const { TextMiddle } = TextComponent;

const t = sceneTranslator("scene6");

const Scene6S0: Component = () => (
  <>
    <TextMiddle text={t("6-0")} />
  </>
);

const Scene6S1: Component = () => (
  <>
    <TextMiddle text={t("6-1")} />
  </>
);

const Scene6S2: Component = () => (
  <>
    <TextMiddle text={t("6-2")} />
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
    <TextMiddle text={t("6-4")} />
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
