import type { Component } from "solid-js";
import TextComponent from "../components/Text";
import { sceneTranslator } from "../config/i18n";

const { TextMiddle } = TextComponent;

const t = sceneTranslator("scene25to29");

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
      <TextMiddle
        class="text-[14px] xs:text-[12px] tracking-[0em] max-w-[327px]"
        text={t(`28-0.${rand}`)}
      >
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
  Scene27S0,
  Scene28S0,
  Scene29S0,
};

export default Scene25to27;
