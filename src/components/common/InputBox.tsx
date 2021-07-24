import { Accessor, Component, createEffect, createSignal } from "solid-js";

export const SMALL_INPUTBOX_HEIGHT = 50; // px

type SmallInputBoxProps = {
  signal: [get: Accessor<string>, set: (v: string | ((prev: string) => string)) => string]; // eslint-disable-line
  placeHolder: string;
  isGoingNextScene?: Accessor<boolean>;
};

type InputBoxProps = SmallInputBoxProps & { isMinimized?: boolean };

const InputBox: Component<InputBoxProps> = props => {
  const setText = props.signal[1];
  const minimizedStyle = `border-radius: 4px; width: 200px; height: 50px; padding: 10px 10px;`;
  const [inlineStyle, setInlineStyle] = createSignal(props.isMinimized ? minimizedStyle : "");
  createEffect(() =>
    setInlineStyle(prev => {
      let newStyle = prev;
      if (props.isGoingNextScene)
        newStyle += props.isGoingNextScene()
          ? "border: none; cursor: pointer; background-color: transparent;"
          : "";
      return newStyle;
    }),
  );
  const className = `placeholder-primary-300 resize-none w-[311px] h-[233px] px-[35px] py-[30px] text-[16px] text-center border-[1px] border-purple rounded-[10px] outline-none`;

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
