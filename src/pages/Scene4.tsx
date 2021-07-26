import type { Component } from "solid-js";
import { InvitationPage } from "../components/invitation/InvitationPage";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";
import { sceneTranslator } from "../config/i18n";

const { TextMiddle } = TextComponent;

const t = sceneTranslator("scene4");

const Scene4S0: Component = () => (
  <>
    <InvitationPage header={t("4-0.header")} />
  </>
);

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
    <TextMiddle text={t("4-1-1")} />
  </>
);

const Scene4S1S2: Component = () => (
  <>
    <TextMiddle text={t("4-1-2")} />
  </>
);

const Scene4S2: Component = () => (
  <>
    <TextMiddle text={t("4-2")} />
  </>
);

const Scene4 = {
  Scene4S0,
  Scene4S1,
  Scene4S1S1,
  Scene4S1S2,
  Scene4S2,
};

export default Scene4;
