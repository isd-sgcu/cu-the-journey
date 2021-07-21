import type { Component } from "solid-js";
import { NextScene } from "../components/JumpTo";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";
import { useTranslation } from "../config/i18n";

const { TextMiddle } = TextComponent;

function t(JSONkey: string) {
  const [translate] = useTranslation("scene5");
  return translate(JSONkey);
}

const Scene5S0: Component = () => (
  <>
    <NextScene page="/5-1">
      <TextMiddle text={t("5-0")} />
    </NextScene>
  </>
);

const Scene5S1: Component = () => (
  <>
    <NextScene page="/5-2">
      <TextMiddle text={t("5-1")} />
    </NextScene>
  </>
);

const Scene5S2: Component = () => (
  <>
    <NextScene page="/5-3">
      <TextMiddle text={t("5-2")} />
    </NextScene>
  </>
);

const Scene5S3: Component = () => (
  <>
    <NextScene page="/5-4">
      <TextMiddle text={t("5-3")} />
    </NextScene>
  </>
);

const Scene5S4: Component = () => (
  <>
    <ChoiceComponent question={t("5-4.q")} choices={[t("5-4.c1"), t("5-4.c2")]} />
  </>
);

const Scene5S5S1: Component = () => (
  <>
    <NextScene page="/5-5-2">
      <TextMiddle text={t("5-5-1")} />
    </NextScene>
  </>
);

const Scene5S5S2: Component = () => (
  <>
    <NextScene page="/5-5-3">
      <TextMiddle text={t("5-5-2")} />
    </NextScene>
  </>
);

const Scene5S5S3: Component = () => (
  <>
    <ChoiceComponent question={t("5-5-3.q")} choices={[t("5-5-3.c1"), t("5-5-3.c2")]} />
  </>
);

const Scene5 = {
  Scene5S0,
  Scene5S1,
  Scene5S2,
  Scene5S3,
  Scene5S4,
  Scene5S5S1,
  Scene5S5S2,
  Scene5S5S3
};

export default Scene5;
