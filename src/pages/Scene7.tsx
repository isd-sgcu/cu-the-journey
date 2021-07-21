import type { Component } from "solid-js";
import { NextScene, PrevScene } from "../components/JumpTo";
import TextComponent from "../components/Text";
import { useTranslation } from "../config/i18n";

const { TextMiddle } = TextComponent;

function t(JSONkey: string) {
  const [translate] = useTranslation("scene7");
  return translate(JSONkey);
}

const Scene7S0: Component = () => (
  <>
    <TextMiddle text={t("7-0")} />
    <PrevScene page="/6-3" />
    <NextScene page="/7-1" />
  </>
);

const Scene7S1: Component = () => (
  <>
    <TextMiddle text={t("7-1")} />
    <PrevScene page="/7-0" />
    <NextScene page="/7-1-1" />
  </>
);

const Scene7S1S1: Component = () => (
  <>
    <TextMiddle text={t("7-1-1")} />
    <PrevScene page="/7-1" />
    <NextScene page="/7-1-2" />
  </>
);

const Scene7S1S2: Component = () => (
  <>
    <TextMiddle text={t("7-1-2")} />
    <PrevScene page="/7-1-1" />
    <NextScene page="/7-2" />
  </>
);

const Scene7S2: Component = () => (
  <>
    <TextMiddle text={t("7-2")} />
    <PrevScene page="/7-1-2" />
    <NextScene page="/7-2-1" />
  </>
);

const Scene7S2S1: Component = () => (
  <>
    <TextMiddle text={t("7-2-1")} />
    <PrevScene page="/7-2" />
    <NextScene page="/7-2-2" />
  </>
);

const Scene7S2S2: Component = () => (
  <>
    <TextMiddle text={t("7-2-2")} />
    <PrevScene page="/7-2-1" />
    <NextScene page="/7-3" />
  </>
);

const Scene7S3: Component = () => (
  <>
    <TextMiddle text={t("7-3")} />
    <PrevScene page="/7-2-2" />
    <NextScene page="/7-3-1" />
  </>
);

const Scene7S3S1: Component = () => (
  <>
    <TextMiddle text={t("7-3-1")} />
    <PrevScene page="/7-3" />
    <NextScene page="/7-3-2" />
  </>
);

const Scene7S3S2: Component = () => (
  <>
    <TextMiddle text={t("7-3-2")} />
    <PrevScene page="/7-3-1" />
    <NextScene page="/8-0" />
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
