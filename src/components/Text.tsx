import type { Component } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

interface TextProps {
  text: string | string[];
  class?: string;
}

function addtText(text: string | string[]): string | JSX.Element {
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
  <div class="flex h-[667px] w-[375px] justify-center items-center z-10">
    <div class="text-purple text-[24px] text-center leading=[38px] tracking-[2%] font-BaiJam font-bold">
      <h2>{addtText(props.text)}</h2>
    </div>
  </div>
);

const TextMiddle: Component<TextProps> = props => (
  <div class="flex h-[667px] w-[375px] justify-center items-center z-10">
    <div
      class={`text-purple text-[16px] text-center leading=[24px] tracking-[0.5px] font-BaiJam font-normal ${props.class}`}
    >
      <p>{addtText(props.text)}</p>
      {props.children}
    </div>
  </div>
);

// 👽
export { TextBold, TextMiddle };

const TextComponent = {
  TextBold,
  TextMiddle
};
export default TextComponent;
