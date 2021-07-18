import type { Component } from "solid-js";
import { Link } from "solid-app-router";

interface ChoiceButtonProps {
  href: string;
  text: string;
  isLongBtn?: boolean;
}

interface ChoiceComponentProps {
  question: string;
  choices: Array<string[]>;
  isLong?: boolean;
}

const ChoiceButton: Component<ChoiceButtonProps> = props => (
  <div>
    <Link href={props.href}>
      <button
        class={`${
          props.isLongBtn ? "w-[220px]" : "w-[150px]"
        } h-[40px] mt-[16px] rounded-full cursor-pointer
                  text-[14px] leading-[28px] text-purple font-normal font-Mitr border-[1px] border-purple
                  hover:bg-purple-light
                  focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-mint focus:ring-offset-1`}
      >
        {props.text}
      </button>
    </Link>
  </div>
);

const ChoiceComponent: Component<ChoiceComponentProps> = props => {
  const buttons = props.choices.map(choice => {
    const text: string = choice[0];
    const ref: string = choice[1] ? choice[1] : "/";
    return <ChoiceButton text={text} href={ref} isLongBtn={props.isLong} />;
  });
  return (
    <>
      <div class="flex h-screen justify-center items-center">
        <div class="flex flex-col items-center min-w-[20rem]">
          <div class="text-center selection:bg-purple selection:text-yellow">
            <h5>{props.question}</h5>
          </div>
          {buttons}
        </div>
      </div>
    </>
  );
};

export default ChoiceComponent;
