import type { Accessor, Component } from "solid-js";

type InputBoxProps = {
  signal: [get: Accessor<string>, set: (v: string | ((prev: string) => string)) => string]; // eslint-disable-line
  placeHolder: string;
  isGoingNextScene: Accessor<boolean>;
};

const InputBox: Component<InputBoxProps> = props => {
  const setText = props.signal[1];

  return (
    <textarea
      oninput={e => setText((e.target as HTMLTextAreaElement).value)}
      spellcheck={false}
      placeholder={props.placeHolder}
      style={props.isGoingNextScene() ? "border: none; cursor: pointer;" : ""}
      class="placeholder-primary-300 resize-none w-[311px] h-[233px] px-[35px] py-[30px] text-center border-[1px] border-purple rounded-[10px] outline-none"
    ></textarea>
  );
};

export default InputBox;
