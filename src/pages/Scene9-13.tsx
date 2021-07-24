import type { Component } from "solid-js";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";
import { sceneTranslator } from "../config/i18n";

const { TextBold, TextMiddle } = TextComponent;

const t = sceneTranslator("scene9to13");

const Scene9S0: Component = () => (
  <>
    <TextMiddle text={t("9-0")} />
  </>
);

const Scene10S0: Component = () => (
  <>
    <TextMiddle text={t("10-0")} />
  </>
);

const Scene11S0: Component = () => (
  <>
    <TextBold text={t("11-0")} />
  </>
);

const Scene12S0: Component = () => (
  <>
    <TextMiddle text={t("12-0")} />
  </>
);

const Scene13S0: Component = () => (
  <>
    <ChoiceComponent
      question={t("13-0.q")}
      choices={[t("13-0.c1"), t("13-0.c2"), t("13-0.c3")]}
      isLong={true}
    />
  </>
);

const Scene13S1: Component = () => (
  <>
    <TextMiddle text={t("13-1")} />
  </>
);

const Scene13S2: Component = () => (
  <>
    <TextMiddle text={t("13-2")}>
      <div class="flex justify-center place-items-center text-[11px]">
        <p>
          {t("13-2-quote.line1")}
          <br />
          {t("13-2-quote.line2")}
        </p>
      </div>
    </TextMiddle>
  </>
);

const Scene13S3: Component = () => (
  <>
    <TextMiddle text={t("13-3")} />
  </>
);

const Scene9to13 = {
  Scene9S0,
  Scene10S0,
  Scene11S0,
  Scene12S0,
  Scene13S0,
  Scene13S1,
  Scene13S2,
  Scene13S3,
};

export default Scene9to13;
