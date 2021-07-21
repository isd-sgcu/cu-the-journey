import type { Component } from "solid-js";
import { NextScene } from "../components/JumpTo";
import TextComponent from "../components/Text";
import { useTranslation } from "../config/i18n";

const { TextMiddle } = TextComponent;

function t(JSONkey: string) {
  const [translate] = useTranslation("scene7");
  return translate(JSONkey);
}

const Scene7S0: Component = () => (
  <>
    <NextScene page="/7-1">
      <TextMiddle text={t("7-0")} />
    </NextScene>
  </>
);

const Scene7S1: Component = () => (
  <>
    <NextScene page="/7-1-1">
      <TextMiddle text={t("7-1")} />
    </NextScene>
  </>
);

const Scene7S1S1: Component = () => (
  <>
    <NextScene page="/7-1-2">
      <TextMiddle text={t("7-1-1")} />
    </NextScene>
  </>
);

const Scene7S1S2: Component = () => (
  <>
    <NextScene page="/7-2">
      <TextMiddle text={t("7-1-2")} />
    </NextScene>
  </>
);

const Scene7S2: Component = () => (
  <>
    <NextScene page="/7-2-1">
      <TextMiddle text={t("7-2")} />
    </NextScene>
  </>
);

const Scene7S2S1: Component = () => (
  <>
    <NextScene page="/7-2-2">
      <TextMiddle text={t("7-2-1")} />
    </NextScene>
  </>
);

const Scene7S2S2: Component = () => (
  <>
    <NextScene page="/7-3">
      <TextMiddle text={t("7-2-2")} />
    </NextScene>
  </>
);

const Scene7S3: Component = () => (
  <>
    <NextScene page="/7-3-1">
      <TextMiddle text={t("7-3")} />
    </NextScene>
  </>
);

const Scene7S3S1: Component = () => (
  <>
    <NextScene page="/7-3-2">
      <TextMiddle text={t("7-3-1")} />
    </NextScene>
  </>
);

const Scene7S3S2: Component = () => (
  <>
    <NextScene page="/8-0">
      <TextMiddle text={t("7-3-2")} />
    </NextScene>
  </>
);

const Scene7 = {
  Scene7S0,
  Scene7S1,
  Scene7S1S1,
  Scene7S1S2,
  Scene7S2,
  Scene7S2S1,
  Scene7S2S2,
  Scene7S3,
  Scene7S3S1,
  Scene7S3S2
};

export default Scene7;
