import type { Component } from "solid-js";
import InputBoxScene from "../components/InputBoxScene";
import { NextScene } from "../components/JumpTo";
import TextComponent from "../components/Text";
import { sceneTranslator } from "../config/i18n";

import "../styles/scrollbar.css";

const { TextMiddle } = TextComponent;

const t = sceneTranslator("scene8");

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
  const props = {
    isMinimized: true,
    placeHolderKey: "8-2-placeholder",
    nextPage: "/9-0",
    orderKeys: "8-2-order",
    buttonTextKey: "8-2-button-text",
    onTapTextKey: "8-2-tap-proceed",
    t
  };
  return <InputBoxScene {...props} />;
};

export default {
  Scene8S0,
  Scene8S1S0,
  Scene8S1S1,
  Scene8S1S2,
  Scene8S2
};
