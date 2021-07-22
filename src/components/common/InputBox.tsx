import { Accessor, Component, createEffect, createSignal } from "solid-js";

type InputBoxProps = {
  signal: [get: Accessor<string>, set: (v: string | ((prev: string) => string)) => string]; // eslint-disable-line
  placeHolder: string;
  isGoingNextScene: Accessor<boolean>;
  isMinimized?: boolean;
};

type SmallInputBoxProps = {
  signal: [get: Accessor<string>, set: (v: string | ((prev: string) => string)) => string]; // eslint-disable-line
  placeHolder: string;
  isGoingNextScene: Accessor<boolean>;
};

const InputBox: Component<InputBoxProps> = props => {
  const setText = props.signal[1];
  const minimizedStyle = "border-radius: 4px; width: 200px; height: 50px; padding: 10px 10px;";
  const [inlineStyle, setInlineStyle] = createSignal(props.isMinimized ? minimizedStyle : "");
  createEffect(() =>
    setInlineStyle(
      prev => (prev += props.isGoingNextScene() ? "border: none; cursor: pointer;" : ""), // eslint-disable-line
    ),
  );

  return (
    <textarea
      oninput={e => setText((e.target as HTMLTextAreaElement).value)}
      spellcheck={false}
      placeholder={props.placeHolder}
      style={inlineStyle()}
      class="placeholder-primary-300 resize-none w-[311px] h-[233px] px-[35px] py-[30px] text-[16px] text-center border-[1px] border-purple rounded-[10px] outline-none"
    ></textarea>
  );
};

const SmallInputBox: Component<SmallInputBoxProps> = props => (
  <InputBox {...props} isMinimized={true} />
);

export { SmallInputBox };
export default InputBox;
