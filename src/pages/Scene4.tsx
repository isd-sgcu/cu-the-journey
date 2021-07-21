import type { Component } from "solid-js";
import { NextScene } from "../components/JumpTo";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";
import { useTranslation } from "../config/i18n";

const { TextMiddle } = TextComponent;

function t(JSONkey: string) {
  const [translate] = useTranslation("scene4");
  return translate(JSONkey);
}

const Scene4S1: Component = () => (
  <>
    <ChoiceComponent
      question={t("4-1.q")}
      choices={[t("4-1.c1"), t("4-1.c2"), t("4-1.c3"), t("4-1.c4")]}
    />
  </>
);

const Scene4S1S1: Component = () => (
  <>
    <NextScene page="/4-2">
      <TextMiddle text={t("4-1-1")} />
    </NextScene>
  </>
);

const Scene4S1S2: Component = () => (
  <>
    <NextScene page="/4-2">
      <TextMiddle text={t("4-1-2")} />
    </NextScene>
  </>
);

const Scene4S2: Component = () => (
  <>
    <NextScene page="/5-0">
      <TextMiddle text={t("4-2")} />
    </NextScene>
  </>
);

const Scene4 = {
  Scene4S1,
  Scene4S1S1,
  Scene4S1S2,
  Scene4S2
};

export default Scene4;
