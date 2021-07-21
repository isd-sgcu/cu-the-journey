import type { Component } from "solid-js";
import { NextScene, PrevScene } from "../components/JumpTo";
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
    <PrevScene page="/3-4" />
    <NextScene page="/4-2" />
  </>
);

const Scene4S1S1: Component = () => (
  <>
    <TextMiddle text={t("4-1-1")} />
    <PrevScene page="/4-1" />
    <NextScene page="/4-2" />
  </>
);

const Scene4S1S2: Component = () => (
  <>
    <TextMiddle text={t("4-1-2")} />
    <PrevScene page="/4-1" />
    <NextScene page="/4-2" />
  </>
);

const Scene4S2: Component = () => (
  <>
    <TextMiddle text={t("4-2")} />
    <PrevScene page="/4-1" />
    <NextScene page="/5-0" />
  </>
);

const Scene4 = {
  Scene4S1,
  Scene4S1S1,
  Scene4S1S2,
  Scene4S2
};

export default Scene4;
