import type { Component } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

interface TextProps extends JSX.HTMLAttributes<HTMLDivElement> {
  text: string | string[];
  class?: string;
}

// also used in MultiStepScene
export function addtText(text: string | string[]): string | JSX.Element {
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
  <div class={`flex h-[667px] max-w-[327px] justify-center items-center z-10 ${props.class}`}>
    <div class="text-purple text-[24px] text-center leading=[38px] tracking-[2%] font-BaiJam font-bold">
      <h2>{addtText(props.text)}</h2>
    </div>
  </div>
);

const TextMiddle: Component<TextProps> = props => (
  <div class={`flex h-[667px] max-w-[327px] justify-center items-center z-10 ${props.class}`}>
    <div
      class={`text-purple text-[16px] text-center leading=[24px] tracking-[0.5px] font-BaiJam font-normal ${props.class}`}
      style="overflow-wrap: break-word;max-width:100%"
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
  TextMiddle,
};
export default TextComponent;
