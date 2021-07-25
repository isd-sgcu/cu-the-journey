import { Accessor, Component, createEffect, createSignal } from "solid-js";

type SmallInputBoxProps = {
  signal: [get: Accessor<string>, set: (v: string | ((prev: string) => string)) => string]; // eslint-disable-line
  placeHolder: string;
  noWrap?: boolean;
  isGoingNextScene?: Accessor<boolean>; // if true, outline-none and bg-transparent
};

type InputBoxProps = SmallInputBoxProps & { isMinimized?: boolean };

const InputBox: Component<InputBoxProps> = props => {
  const setText = props.signal[1];

  const minimizedStyle = "border-radius: 4px; width: 200px; height: 46px; padding: 10px 10px;";
  const [inlineStyle, setInlineStyle] = createSignal(
    props.isMinimized && props.noWrap
      ? `${minimizedStyle}white-space: nowrap;`
      : props.isMinimized
      ? minimizedStyle
      : "",
  );

  createEffect(() =>
    setInlineStyle(prev => {
      let newStyle = prev;
      if (props.isGoingNextScene) {
        // This right below prevents resizable SmallInputBox from shrinking after clicking save
        const eh = props.isMinimized
          ? "height: 233px; width: 311px; padding: 30px 35px; border-radius: 10px;"
          : "";

        newStyle += props.isGoingNextScene()
          ? `border: none; cursor: pointer; background-color: transparent;${eh}`
          : "";
      }

      return newStyle;
    }),
  );

  const hasScrollbar = (textarea: HTMLTextAreaElement) =>
    textarea.clientHeight < textarea.scrollHeight;

  let hasResized = false;

  return (
    <textarea
      onKeyPress={e => {
        // No new line on enter in noWrap InputBox
        if (props.noWrap && e.key === "Enter") e.preventDefault();
      }}
      onKeyUp={e => {
        const self = e.target as HTMLTextAreaElement;
        setText(self.value);

        if (!props.isMinimized) return;
        if (props.noWrap) return;

        if (!hasResized && hasScrollbar(self)) {
          hasResized = true;
          self.style.height = "233px";
          self.style.width = "311px";
          self.style.padding = "30px 35px";
          self.style.borderRadius = "10px";
          return;
        }

        if (self.value === "") {
          hasResized = false; // reset the resizing state
          self.style.height = "46px";
          self.style.width = "200px";
          self.style.padding = "10px 10px";
          self.style.borderRadius = "4px";
        }
      }}
      spellcheck={false}
      placeholder={props.placeHolder}
      style={`transition: all 300ms;${inlineStyle()}`}
      class="placeholder-primary-300 resize-none w-[311px] h-[233px] px-[35px] py-[30px] text-[16px] text-center border-[1px] border-purple rounded-[10px] outline-none nowrap-input-box"
    ></textarea>
  );
};

const SmallInputBox: Component<SmallInputBoxProps> = props => (
  <InputBox {...props} isMinimized={true} />
);

export { SmallInputBox };
export default InputBox;
