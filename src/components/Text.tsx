import type { Component } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
// import { useTranslation } from "../config/i18n";

interface TextProps {
  text: string | string[];
}

function addtText(text: string | string[]): string | JSX.Element {
  // const [t] = useTranslation("scene3");
  if (Array.isArray(text))
    return text.map(line => (
      <>
        {line}
        <br />
      </>
    ));
  return text;
}

const TextBold: Component<TextProps> = props => (
  <div class="flex h-screen justify-center items-center">
    <div class="text-purple text-[24px] text-center leading=[38px] tracking-[2%] font-BaiJam font-bold">
      <h2>{addtText(props.text)}</h2>
    </div>
  </div>
);

const TextUpper: Component<TextProps> = props => (
  <div class="flex h-screen justify-center items-center">
    <div class="text-purple text-[16px] text-center leading=[24px] tracking-[0.5px] font-BaiJam font-normal">
      <p>{addtText(props.text)}</p>
    </div>
  </div>
);

const TextMiddle: Component<TextProps> = props => (
  <div class="flex h-screen justify-center items-center">
    <div class="text-purple text-[16px] text-center leading=[24px] tracking-[0.5px] font-BaiJam font-normal">
      <p>{addtText(props.text)}</p>
    </div>
  </div>
);

const TextComponent = {
  TextBold,
  TextUpper,
  TextMiddle
};

export default TextComponent;
