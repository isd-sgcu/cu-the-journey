import type { Component } from "solid-js";

const TextBold: Component<{ text: string[] }> = props => {
  const text = props.text.map(line => (
    <>
      {line}
      <br />
    </>
  ));
  return (
    <div class="flex h-screen justify-center items-center">
      <div class="text-purple text-[24px] text-center leading=[38px] tracking-[2%] font-BaiJam font-bold">
        <h5>{text}</h5>
      </div>
    </div>
  );
};

const TextUpper: Component<{ text: string[] }> = props => {
  const text = props.text.map(line => (
    <>
      {line}
      <br />
    </>
  ));
  return (
    <div class="flex h-screen justify-center items-center">
      <div class="text-purple text-[16px] text-center leading=[24px] tracking-[0.5px] font-BaiJam font-normal">
        <p>{text}</p>
      </div>
    </div>
  );
};

const TextMiddle: Component<{ text: string[] }> = props => {
  const text = props.text.map(line => (
    <>
      {line}
      <br />
    </>
  ));
  return (
    <div class="flex h-screen justify-center items-center">
      <div class="text-purple text-[16px] text-center leading=[24px] tracking-[0.5px] font-BaiJam font-normal">
        <p>{text}</p>
      </div>
    </div>
  );
};

const TextComponent = {
  TextBold,
  TextUpper,
  TextMiddle
};

export default TextComponent;
