import { Accessor, Component, createEffect, createSignal } from "solid-js";

export const INPUTBOX_HEIGHT = 233; // px
export const SMALL_INPUTBOX_HEIGHT = 50; // px

type SmallInputBoxProps = {
  signal: [get: Accessor<string>, set: (v: string | ((prev: string) => string)) => string]; // eslint-disable-line
  placeHolder: string;
  isGoingNextScene: Accessor<boolean>;
  height?: number;
};

type InputBoxProps = SmallInputBoxProps & { isMinimized?: boolean };

const InputBox: Component<InputBoxProps> = props => {
  const setText = props.signal[1];
  const minimizedStyle = `border-radius: 4px; width: 200px; height: ${
    props.height || SMALL_INPUTBOX_HEIGHT
  }px; padding: 10px 10px;`;
  const [inlineStyle, setInlineStyle] = createSignal(props.isMinimized ? minimizedStyle : "");
  createEffect(() =>
    setInlineStyle(
      prev => (prev += props.isGoingNextScene() ? "border: none; cursor: pointer;" : ""), // eslint-disable-line
    ),
  );
  const className = `placeholder-primary-300 resize-none w-[311px] h-[${
    props.height || INPUTBOX_HEIGHT
  }px] px-[35px] py-[30px] text-[16px] text-center border-[1px] border-purple rounded-[10px] outline-none`;

  return (
    <textarea
      oninput={e => setText((e.target as HTMLTextAreaElement).value)}
      spellcheck={false}
      placeholder={props.placeHolder}
      style={inlineStyle()}
      class={className}
    ></textarea>
  );
};

const SmallInputBox: Component<SmallInputBoxProps> = props => (
  <InputBox {...props} isMinimized={true} />
);

export { SmallInputBox };
export default InputBox;
