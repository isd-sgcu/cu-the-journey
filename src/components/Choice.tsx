import { Component, createSignal } from "solid-js";
import { Link } from "solid-app-router";

const [count, setCount] = createSignal(0);
const increment = (by = 1) => setCount(count() + by);

const ChoiceButton: Component<{ href: string; text: string; by?: number }> = props => (
  <div>
    <Link href={props.href}>
      <button
        onClick={() => increment(props.by)}
        class="w-[12rem] h-[2rem] mt-[8px] rounded-full cursor-pointer
                  text-md text-purple font-normal font-ChulaC border-[1px] border-purple
                  hover:bg-purple-light
                  focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-mint focus:ring-offset-1"
      >
        {props.text}
      </button>
    </Link>
  </div>
);

const ChoiceComponent: Component<{ question: string; choices: Array<string[]> }> = props => {
  const buttons = props.choices.map(choice => {
    const text: string = choice[0];
    const ref: string = choice[1] ? choice[1] : "/";
    return <ChoiceButton text={text} href={ref} />;
  });
  return (
    <>
      <div class="flex h-screen justify-center items-center">
        <div class="flex flex-col items-center min-w-[20rem]">
          <div class="font-Mitr text-center text-xl font-medium text-purple selection:bg-purple selection:text-yellow">
            <h6>{props.question}</h6>
          </div>
          {buttons}
        </div>
      </div>
    </>
  );
};

export default ChoiceComponent;
