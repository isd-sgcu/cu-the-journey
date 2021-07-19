const InputBox = props => {
  const { placeHolder } = props;
  const [text, setText] = props.signal;

  const updateText = event => {
    const textInArea = event.target.value as string;
    console.log(text());
    if (textInArea === "") {
      setText(placeHolder);
      return;
    }
    setText(textInArea);
  };

  return (
    <textarea
      onfocus={() => {
        if (text() === placeHolder) setText("");
      }}
      onblur={() => {
        if (text() === "") setText(placeHolder);
      }}
      oninput={updateText}
      spellcheck={false}
      class="placeholder-purple resize-none w-[311px] h-[233px] px-[35px] py-[30px] text-center border-[1px] border-purple rounded-[10px] outline-none"
    >
      {text()}
    </textarea>
  );
};

export default InputBox;
