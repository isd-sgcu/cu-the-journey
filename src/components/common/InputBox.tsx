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

  let hasResized = false;

  createEffect(() =>
    setInlineStyle(prev => {
      let newStyle = prev;
      if (props.isGoingNextScene) {
        // This right below prevents resizable SmallInputBox from shrinking after clicking save
        const eh =
          props.isMinimized && hasResized
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

  const expand = (self: HTMLTextAreaElement) => {
    self.style.height = "233px"; // eslint-disable-line
    self.style.width = "311px"; // eslint-disable-line
    self.style.padding = "30px 35px"; // eslint-disable-line
    self.style.borderRadius = "10px"; // eslint-disable-line
  };

  const shrink = (self: HTMLTextAreaElement) => {
    self.style.height = "46px"; // eslint-disable-line
    self.style.width = "200px"; // eslint-disable-line
    self.style.padding = "10px 10px"; // eslint-disable-line
    self.style.borderRadius = "4px"; // eslint-disable-line
  };

  return (
    <textarea
      onKeyDown={e => {
        // No new line on enter in noWrap InputBox
        if (props.noWrap && (e.key === "Enter" || (e.key === "Enter" && e.shiftKey)))
          e.preventDefault();

        if (!props.isMinimized) return;
        if (props.noWrap) return;

        const self = e.target as HTMLTextAreaElement;
        if (!hasResized && hasScrollbar(self)) {
          hasResized = true;
          expand(self);
          return;
        }
        if (self.value === "") {
          hasResized = false; // reset the resizing state
          shrink(self);
        }
      }}
      onKeyUp={e => {
        const self = e.target as HTMLTextAreaElement;
        setText(self.value);

        if (!props.isMinimized) return;
        if (props.noWrap) return;
        if (self.value === "") {
          hasResized = false; // reset the resizing state
          shrink(self);
        }
      }}
      spellcheck={false}
      placeholder={props.placeHolder}
      disabled={props.isGoingNextScene && props.isGoingNextScene()}
      style={`transition: all 300ms;${inlineStyle()}`}
      class="placeholder-primary-300 resize-none w-[311px] xs:w-[290px] h-[233px] px-[35px] py-[30px] text-[16px] text-center border-[1px] border-purple rounded-[10px] outline-none nowrap-input-box"
    ></textarea>
  );
};

const SmallInputBox: Component<SmallInputBoxProps> = props => (
  <InputBox {...props} isMinimized={true} />
);

export { SmallInputBox };
export default InputBox;
