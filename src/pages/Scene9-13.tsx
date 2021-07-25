import type { Component } from "solid-js";
import { getButtons } from "../components/Choice";
import { AnimationRoute } from "../components/AnimationRoute";
import TextComponent from "../components/Text";
import { sceneTranslator } from "../config/i18n";
import { replaceLine } from "./TextReplacer";
import Typography from "../components/common/Typography";

const { TextMiddle } = TextComponent;

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
  <div
    class="max-w-full w-full min-h-[244px] flex items-center bg-[#FFFFFFCC] rounded-[10px]"
    style="border: 1px solid #5F229F"
  >
    <Typography
      variant="h2"
      style="overflow-wrap: break-word;max-width:100%"
      class="px-3 py-3 w-full"
    >
      {replaceLine(t("11-0"))}
    </Typography>
  </div>
);

const Scene12S0: Component = () => (
  <>
    <TextMiddle text={t("12-0")} />
  </>
);

const Scene13S0: Component = () => {
  const questions = [t("13-0-q0"), t("13-0-q1")].map(q => <h5>{q}</h5>);
  const buttons = getButtons([t("13-0-choices.c1"), t("13-0-choices.c2"), t("13-0-choices.c3")]);

  return (
    <>
      <AnimationRoute children={[...questions, buttons]} />
    </>
  );
};

const Scene13S1: Component = () => (
  <>
    <TextMiddle text={t("13-1")} />
  </>
);

const Scene13S2: Component = () => (
  <>
    <TextMiddle text={t("13-2-q0")}>
      <div class="text-[#884BC1]">{t("13-2-q1")}</div>
      <div class="text-[#884BC1]">{t("13-2-q2")}</div>
      <div class="flex justify-center place-items-center text-[11px] leading-[18px] text-[#884BC1] mt-[5px]">
        <p>
          {t("13-2-quote.line1")}
          <br />
          {t("13-2-quote.line2")}
        </p>
      </div>
    </TextMiddle>
  </>
);

const Scene13S3: Component = () => {
  const eachLine = [...t("13-3")].map(q => <p>{q}</p>);
  return (
    <>
      <AnimationRoute children={eachLine} transitionDur={2500} />
    </>
  );
};

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
