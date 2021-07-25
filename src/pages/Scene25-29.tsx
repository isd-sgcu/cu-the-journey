import type { Component } from "solid-js";
import TextComponent from "../components/Text";
import { sceneTranslator } from "../config/i18n";

const { TextMiddle } = TextComponent;

const t = sceneTranslator("scene25to29");

const Scene25S0: Component = () => (
  <>
    <div class="absolute bg-purple w-screen max-w-[375px] h-screen min-h-[667px] max-h-[667px]">
      <TextMiddle class="text-white" text={t("25-0")} />
    </div>
  </>
);

const Scene26S0: Component = () => (
  <>
    <div class="absolute bg-purple w-screen max-w-[375px] h-screen min-h-[667px] max-h-[667px]">
      <TextMiddle class="text-white" text={t("26-0")} />
    </div>
  </>
);

const Scene27S0: Component = () => (
  <>
    <TextMiddle text={t("27-0")} />
  </>
);

const Scene28S0: Component = () => {
  const rand = Math.floor(Math.random() * 10) + 1;
  const quoteFrom = (quote: string | any[]) => {
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
      <TextMiddle class="tracking-[0em] min-w-[350px]" text={t(`28-0.${rand}`)}>
        <p class={`relative text-[13px] right-2 italic text-right tracking-[0em]`}>
          <br />
          <br />
          {quoteFrom(t(`28-0.quote${rand}`))}
        </p>
      </TextMiddle>
    </>
  );
};

const Scene29S0: Component = () => (
  <>
    <TextMiddle text={t("29-0")} />
  </>
);

const Scene25to27 = {
  Scene25S0,
  Scene26S0,
  Scene27S0,
  Scene28S0,
  Scene29S0,
};

export default Scene25to27;
