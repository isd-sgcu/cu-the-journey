import type { Component } from "solid-js";
import { NextScene } from "../components/JumpTo";
import TextComponent from "../components/Text";
import { sceneTranslator } from "../config/i18n";

const { TextMiddle } = TextComponent;

const t = sceneTranslator("scene25to29");

const Scene25S0: Component = () => (
  <>
    <div class="absolute bg-purple w-screen max-w-[375px] h-screen min-h-[667px] max-h-[667px]">
      <NextScene page="/26-0">
        <TextMiddle class="text-white" text={t("25-0")} />
      </NextScene>
    </div>
  </>
);

const Scene26S0: Component = () => (
  <>
    <div class="absolute bg-purple w-screen max-w-[375px] h-screen min-h-[667px] max-h-[667px]">
      <NextScene page="/27-0">
        <TextMiddle class="text-white" text={t("26-0")} />
      </NextScene>
    </div>
  </>
);

const Scene27S0: Component = () => (
  <>
    <NextScene page="/28-0">
      <TextMiddle text={t("27-0")} />
    </NextScene>
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
      <NextScene page="/29-0">
        <TextMiddle class="tracking-[0em] min-w-[350px]" text={t(`28-0.${rand}`)}>
          <p class={`relative text-[13px] right-2 italic text-right tracking-[0em]`}>
            <br />
            <br />
            {quoteFrom(t(`28-0.quote${rand}`))}
          </p>
        </TextMiddle>
      </NextScene>
    </>
  );
};

const Scene29S0: Component = () => (
  <>
    <NextScene page="/pick-a-number">
      <TextMiddle text={t("29-0")} />
    </NextScene>
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
