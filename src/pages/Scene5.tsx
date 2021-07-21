import type { Component } from "solid-js";
import { NextScene, PrevScene } from "../components/JumpTo";
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
    <TextMiddle text={t("5-0")} />
    <PrevScene page="/4-2" />
    <NextScene page="/5-1" />
  </>
);

const Scene5S1: Component = () => (
  <>
    <TextMiddle text={t("5-1")} />
    <PrevScene page="/5-0" />
    <NextScene page="/5-2" />
  </>
);

const Scene5S2: Component = () => (
  <>
    <TextMiddle text={t("5-2")} />
    <PrevScene page="/5-1" />
    <NextScene page="/5-3" />
  </>
);

const Scene5S3: Component = () => (
  <>
    <TextMiddle text={t("5-3")} />
    <PrevScene page="/5-2" />
    <NextScene page="/5-4" />
  </>
);

const Scene5S4: Component = () => (
  <>
    <ChoiceComponent question={t("5-4.q")} choices={[t("5-4.c1"), t("5-4.c2")]} />
    <PrevScene page="/5-3" />
    <NextScene page="/6-0" />
  </>
);

const Scene5S5S1: Component = () => (
  <>
    <TextMiddle text={t("5-5-1")} />
    <PrevScene page="/5-4" />
    <NextScene page="/5-5-2" />
  </>
);

const Scene5S5S2: Component = () => (
  <>
    <TextMiddle text={t("5-5-2")} />
    <PrevScene page="/5-5-1" />
    <NextScene page="/5-5-3" />
  </>
);

const Scene5S5S3: Component = () => (
  <>
    <ChoiceComponent question={t("5-5-3.q")} choices={[t("5-5-3.c1"), t("5-5-3.c2")]} />
    <PrevScene page="/5-3" />
    <NextScene page="/6-0" />
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
