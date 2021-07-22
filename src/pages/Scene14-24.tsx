import type { Component } from "solid-js";
import InputBoxScene from "../components/InputBoxScene";
import { NextScene } from "../components/JumpTo";
import { TextMiddle } from "../components/Text";
import { sceneTranslator } from "../config/i18n";

const t = sceneTranslator("scene14to24");

const Scene14S0: Component = () => (
  <>
    <NextScene page="/14-1">
      <TextMiddle text={t("14-0")} />
    </NextScene>
  </>
);

const Scene14S1: Component = () => {
  const props = {
    isMinimized: true,
    placeHolderKey: "14-placeholder",
    nextPage: "/15-0",
    orderKeys: ["14-order1", "14-order2"],
    buttonTextKey: "14-buttonText",
    onTapTextKey: "14-tapText",
    t
  };
  return <InputBoxScene {...props} />;
};

export default { Scene14S0, Scene14S1 };
