import type { Component } from "solid-js";
import { NextScene, PrevScene } from "../components/JumpTo";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";
import { useTranslation } from "../config/i18n";

const { TextMiddle } = TextComponent;

function t(JSONkey: string) {
  const [translate] = useTranslation("scene3");
  return translate(JSONkey);
}

const Scene3S0: Component = () => (
  <>
    <TextMiddle text={t("3-0")} />
    <PrevScene page="/3-0" />
    <NextScene page="/3-1" />
  </>
);

const Scene3S1: Component = () => (
  <>
    <ChoiceComponent
      question={t("3-1.q")}
      choices={[t("3-1.c1"), t("3-1.c2"), t("3-1.c3"), t("3-1.c4")]}
    />
    <PrevScene page="/3-0" />
    <NextScene page="/3-2" />
  </>
);

const Scene3S2: Component = () => (
  <>
    <TextMiddle text={t("3-2")} />
    <PrevScene page="/3-1" />
    <NextScene page="/3-3" />
  </>
);

const Scene3S3: Component = () => (
  <>
    <ChoiceComponent
      question={t("3-3.q")}
      choices={[t("3-3.c1"), t("3-3.c2"), t("3-3.c3"), t("3-3.c4"), t("3-3.c5")]}
    />
    <PrevScene page="/3-2" />
    <NextScene page="/3-4" />
  </>
);

const Scene3S3S1: Component = () => (
  <>
    <TextMiddle text={t("3-4")} />
    <PrevScene page="/3-3" />
    <NextScene page="/3-4" />
  </>
);

const Scene3S4: Component = () => (
  <>
    <TextMiddle text={t("3-5")} />
    <PrevScene page="/3-3" />
    <NextScene page="/4-1" />
  </>
);

const Scene3 = {
  Scene3S0,
  Scene3S1,
  Scene3S2,
  Scene3S3,
  Scene3S3S1,
  Scene3S4
};

export default Scene3;
