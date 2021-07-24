import type { Component } from "solid-js";
import InputBoxScene, { StorableKeys } from "../components/InputBoxScene";
import TextComponent, { addtText } from "../components/Text";
import { sceneTranslator } from "../config/i18n";
import { AnimationRoute } from "../components/AnimationRoute";

const { TextMiddle } = TextComponent;

const t = sceneTranslator("scene8");

const Scene8S0: Component = () => (
  <>
    <TextMiddle text={t("8-0")} />
  </>
);

const Scene8S1: Component = () => {
  const textKeys = ["8-1-0", "8-1-1", "8-1-2"];
  return (
    <AnimationRoute
      children={textKeys.map((key, index) => (
        <span>
          {addtText(t(key))}
          {index === textKeys.length ? "" : <br />}
          <br />
        </span>
      ))}
    ></AnimationRoute>
  );
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
