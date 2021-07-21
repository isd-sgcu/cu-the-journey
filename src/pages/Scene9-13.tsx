import type { Component } from "solid-js";
import { NextScene, PrevScene } from "../components/JumpTo";
import ChoiceComponent from "../components/Choice";
import TextComponent from "../components/Text";
import { useTranslation } from "../config/i18n";

const { TextBold, TextMiddle } = TextComponent;

function t(JSONkey: string) {
  const [translate] = useTranslation("scene9to13");
  return translate(JSONkey);
}

const Scene9S0: Component = () => (
  <>
    <TextMiddle text={t("9-0")} />
    <PrevScene page="/8-1-1" />
    <NextScene page="/10-0" />
  </>
);

const Scene10S0: Component = () => (
  <>
    <TextMiddle text={t("10-0")} />
    <PrevScene page="/9-0" />
    <NextScene page="/11-0" />
  </>
);

const Scene11S0: Component = () => (
  <>
    <TextBold text={t("11-0")} />
    <PrevScene page="/10-0" />
    <NextScene page="/12-0" />
  </>
);

const Scene12S0: Component = () => (
  <>
    <TextMiddle text={t("12-0")} />
    <PrevScene page="/11-0" />
    <NextScene page="/13-0" />
  </>
);

const Scene13S0: Component = () => (
  <>
    <ChoiceComponent
      question={t("13-0.q")}
      choices={[t("13-0.c1"), t("13-0.c2"), t("13-0.c3")]}
      isLong={true}
    />
    <PrevScene page="/12-0" />
    <NextScene page="/13-1" />
  </>
);

const Scene13S1: Component = () => (
  <>
    <TextMiddle text={t("13-1")} />
    <PrevScene page="/13-0" />
    <NextScene page="/13-2" />
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
    <PrevScene page="/13-1" />
    <NextScene page="/13-3" />
  </>
);

const Scene13S3: Component = () => (
  <>
    <TextMiddle text={t("13-3")} />
    <PrevScene page="/13-2" />
    <NextScene page="/14-0" />
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
  Scene13S3
};

export default Scene9to13;
