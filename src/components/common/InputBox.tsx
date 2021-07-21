const InputBox = props => {
  const { placeHolder } = props;
  const setText = props.signal[1];

  const updateText = e => {
    const textInArea = e.target.value as string;
    setText(textInArea);
  };

  return (
    <textarea
      onfocus={e => {
        if ((e.target as HTMLTextAreaElement).value === placeHolder)
          (e.target as HTMLTextAreaElement).value = "";
      }}
      onblur={e => {
        if ((e.target as HTMLTextAreaElement).value.trim() === "") {
          (e.target as HTMLTextAreaElement).value = placeHolder;
        }
      }}
      oninput={updateText}
      spellcheck={false}
      class="placeholder-purple resize-none w-[311px] h-[233px] px-[35px] py-[30px] text-center border-[1px] border-purple rounded-[10px] outline-none"
    >
      {placeHolder}
    </textarea>
  );
};

export default InputBox;
