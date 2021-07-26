import type { Component } from "solid-js";
import { AnimationRoute } from "../components/AnimationRoute";
import TextComponent, { addtText } from "../components/Text";
import { sceneTranslator } from "../config/i18n";

const { TextMiddle } = TextComponent;

const t = sceneTranslator("scene7");

const Scene7S0: Component = () => (
  <>
    <TextMiddle text={t("7-0")} />
  </>
);

const Scene7S1: Component = () => {
  const textKeys = ["7-1-a", "7-1-b", "7-1-c"];
  return (
    <AnimationRoute
      children={textKeys.map((key, index) => (
        <span>
          {addtText(t(key))}
          {index === textKeys.length ? "" : <br />}
          <br />
        </span>
      ))}
    ></AnimationRoute>
  );
};

const Scene7S1S1: Component = () => (
  <>
    <TextMiddle text={t("7-1-1")} />
  </>
);

const Scene7S1S2: Component = () => (
  <>
    <TextMiddle text={t("7-1-2")} />
  </>
);

const Scene7S2: Component = () => {
  const textKeys = ["7-2-a", "7-2-b", "7-2-c"];
  return (
    <AnimationRoute
      children={textKeys.map((key, index) => (
        <span>
          {addtText(t(key))}
          {index === textKeys.length ? "" : <br />}
          <br />
        </span>
      ))}
    ></AnimationRoute>
  );
};

const Scene7S2S1: Component = () => (
  <>
    <TextMiddle text={t("7-2-1")} />
  </>
);

const Scene7S2S2: Component = () => (
  <>
    <TextMiddle text={t("7-2-2")} />
  </>
);

const Scene7S3: Component = () => (
  <>
    <TextMiddle text={t("7-3")} />
  </>
);

const Scene7S3S1: Component = () => (
  <>
    <TextMiddle text={t("7-3-1")} />
  </>
);

const Scene7S3S2: Component = () => (
  <>
    <TextMiddle text={t("7-3-2")} />
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
  Scene7S3S2,
};

export default Scene7;
