import type { Component } from "solid-js";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";
import { sceneTranslator } from "../config/i18n";

const { TextMiddle } = TextComponent;

const t = sceneTranslator("scene3");

const Scene3S0: Component = () => (
  <>
    <TextMiddle text={t("3-0")} />
  </>
);

const Scene3S1: Component = () => (
  <>
    <ChoiceComponent
      question={t("3-1.q")}
      choices={[t("3-1.c1"), t("3-1.c2"), t("3-1.c3"), t("3-1.c4")]}
    />
  </>
);

const Scene3S2: Component = () => (
  <>
    <TextMiddle text={t("3-2")} />
  </>
);

const Scene3S3: Component = () => (
  <>
    <ChoiceComponent
      question={t("3-3.q")}
      choices={[t("3-3.c1"), t("3-3.c2"), t("3-3.c3"), t("3-3.c4"), t("3-3.c5")]}
    />
  </>
);

const Scene3S3S1: Component = () => (
  <>
    <TextMiddle text={t("3-4")} />
  </>
);

const Scene3S4: Component = () => (
  <>
    <TextMiddle text={t("3-5")} />
  </>
);

const Scene3 = {
  Scene3S0,
  Scene3S1,
  Scene3S2,
  Scene3S3,
  Scene3S3S1,
  Scene3S4,
};

export default Scene3;
