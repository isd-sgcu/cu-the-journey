import type { Component } from "solid-js";
// createSignal, Show
import { NextScene, PrevScene } from "../components/JumpTo";
import TextComponent from "../components/Text";
// import InputBox from "../components/common/InputBox";
// import Button from "../components/common/Button";
import { useTranslation } from "../config/i18n";

const { TextMiddle } = TextComponent;

function t(JSONkey: string) {
  const [translate] = useTranslation("scene8");
  return translate(JSONkey);
}

const Scene8S0: Component = () => (
  <>
    <TextMiddle text={t("8-0")} />
    <PrevScene page="/8-0" />
    <NextScene page="/8-1" />
  </>
);

const Scene8S1S0: Component = () => (
  <>
    <TextMiddle text={t("8-1-0")} />
    <PrevScene page="/8-0" />
    <NextScene page="/8-1" />
  </>
);

const Scene8S1S1: Component = () => (
  <>
    <TextMiddle text={t("8-1-1")} />
    <PrevScene page="/8-0" />
    <NextScene page="/8-1" />
  </>
);

const Scene8S1S2: Component = () => (
  <>
    <TextMiddle text={t("8-1-2")} />
    <PrevScene page="/8-0" />
    <NextScene page="/8-1" />
  </>
);

const Scene8S2: Component = () => (
  <>
    <TextMiddle text={t("8-0")} />
    <PrevScene page="/8-0" />
    <NextScene page="/8-1" />
  </>
);

export default {
  Scene8S0,
  Scene8S1S0,
  Scene8S1S1,
  Scene8S1S2,
  Scene8S2
};
