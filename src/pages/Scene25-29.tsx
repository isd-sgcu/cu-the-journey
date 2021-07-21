import type { Component } from "solid-js";
import { NextScene, PrevScene } from "../components/JumpTo";
import TextComponent from "../components/Text";
import { useTranslation } from "../config/i18n";

const { TextMiddle } = TextComponent;

function t(JSONkey: string) {
  const [translate] = useTranslation("scene25to29");
  return translate(JSONkey);
}

const Scene25S0: Component = () => (
  <>
    <div class="absolute bg-purple w-screen max-w-[375px] h-screen min-h-[667px] max-h-[667px]"></div>
    <TextMiddle class="text-white" text={t("25-0")} />
    <PrevScene page="/24-0" />
    <NextScene page="/26-0" />
  </>
);

const Scene26S0: Component = () => (
  <>
    <div class="absolute bg-purple w-screen max-w-[375px] h-screen min-h-[667px] max-h-[667px]"></div>
    <TextMiddle class="text-white" text={t("26-0")} />
    <PrevScene page="/25-0" />
    <NextScene page="/27-0" />
  </>
);

const Scene27S0: Component = () => (
  <>
    <TextMiddle text={t("27-0")} />
    <PrevScene page="/26-0" />
    <NextScene page="/28-0" />
  </>
);

const Scene28S0: Component = () => {
  const rand = Math.floor(Math.random() * 8) + 1;
  const quoteFrom = quote => {
    if (Array.isArray(quote))
      return quote.map(line => (
        <>
          {line}
          <br />
        </>
      ));
    return quote;
  };
  return (
    <>
      <TextMiddle class="text-[13px]" text={t(`28-0.${rand}`)} />
      <p class={`absolute bottom-[8rem] right-[6rem] text-[12px] italic text-right`}>
        {quoteFrom(t(`28-0.quote${rand}`))}
      </p>
      <PrevScene page="/27-0" />
      <NextScene page="/29-0" />
    </>
  );
};

const Scene29S0: Component = () => (
  <>
    <TextMiddle text={t("29-0")} />
    <PrevScene page="/28-0" />
    <NextScene page="/30-0" />
  </>
);

const Scene25to27 = {
  Scene25S0,
  Scene26S0,
  Scene27S0,
  Scene28S0,
  Scene29S0
};

export default Scene25to27;
