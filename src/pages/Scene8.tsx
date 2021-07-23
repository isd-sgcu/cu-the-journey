import type { Component } from "solid-js";
import type { MultiStepScenePropsType } from "../components/MultiStepScene";
import MultiStepScene from "../components/MultiStepScene";
import InputBoxScene, { StorableKeys } from "../components/InputBoxScene";
import { NextScene } from "../components/JumpTo";
import TextComponent from "../components/Text";
import { sceneTranslator } from "../config/i18n";

const { TextMiddle } = TextComponent;

const t = sceneTranslator("scene8");

const Scene8S0: Component = () => (
  <>
    <NextScene page="/8-1">
      <TextMiddle text={t("8-0")} />
    </NextScene>
  </>
);

const Scene8S1: Component = () => {
  const props: MultiStepScenePropsType = {
    textKeys: ["8-1-0", "8-1-1", "8-1-2"],
    nextPage: "/8-2",
    t,
  };
  return <MultiStepScene {...props} />;
};

const Scene8S2: Component = () => {
  const props = {
    isMinimized: true,
    placeHolderKey: "8-2-placeholder",
    nextPage: "/9-0",
    orderKeys: "8-2-order",
    buttonTextKey: "8-2-button-text",
    onTapTextKey: "8-2-tap-proceed",
    storeKey: StorableKeys.Scene8S2,
    t,
  };
  return <InputBoxScene {...props} />;
};

export default {
  Scene8S0,
  Scene8S1,
  Scene8S2,
};
