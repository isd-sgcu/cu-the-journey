import type { Component } from "solid-js";
import { useRouter } from "solid-app-router";

interface ChoiceButtonProps {
  href: string;
  text: string;
  isLongBtn: boolean;
}

interface ChoiceComponentProps {
  question: string | string[];
  choices: string[] | Array<string[]>;
  isLong?: boolean;
}

const ChoiceButton: Component<ChoiceButtonProps> = props => {
  const [, { push }] = useRouter()!;
  return (
    <>
      <button
        onClick={() => push(props.href)}
        class={`${
          props.isLongBtn ? "w-[220px]" : "w-[150px]"
        } h-[40px] mt-[16px] rounded-full cursor-pointer
                  text-[14px] leading-[28px] text-purple font-normal font-Mitr border-[1px] border-purple
                  hover:bg-purple-light
                  focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-mint focus:ring-offset-1`}
      >
        {props.text}
      </button>
    </>
  );
};

const ChoiceComponent: Component<ChoiceComponentProps> = props => {
  const buttons = props.choices.map(choice => {
    const text: string = choice[0];
    const ref: string = choice[1] ? choice[1] : "/";
    return <ChoiceButton text={text} href={ref} isLongBtn={props.isLong || false} />;
  });
  const question = () => {
    if (Array.isArray(props.question)) {
      return props.question.map(line => (
        <>
          {line}
          <br />
        </>
      ));
    }
    return props.question;
  };
  return (
    <>
      <div class="flex h-screen justify-center items-center z-10">
        <div class="flex flex-col items-center min-w-[20rem]">
          <div class="text-center w-[280px] selection:bg-purple selection:text-yellow">
            <h5>{question}</h5>
          </div>
          {buttons}
        </div>
      </div>
    </>
  );
};

export default ChoiceComponent;
