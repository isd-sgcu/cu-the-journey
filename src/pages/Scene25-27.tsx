import type { Component } from "solid-js";
import { NextScene, PrevScene } from "../components/JumpTo";
import TextComponent from "../components/Text";
import { useTranslation } from "../config/i18n";

const { TextMiddle } = TextComponent;

function t(JSONkey: string) {
  const [translate] = useTranslation("scene25to27");
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

const Scene25to27 = {
  Scene25S0,
  Scene26S0,
  Scene27S0
};

export default Scene25to27;
