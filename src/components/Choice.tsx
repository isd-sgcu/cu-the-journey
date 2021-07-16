import { createSignal } from "solid-js";
import { Link } from "solid-app-router";

const [count, setCount] = createSignal(0);
const increment = (by = 1) => setCount(count() + by);

const ChoiceButton = props => (
  <div>
    <Link href={props.href}>
      <button
        onClick={() => increment(props.by)}
        class="w-[12rem] h-[2rem] mt-[8px] rounded-full cursor-pointer
                  text-md text-purple font-normal font-Mitr border-[1px] border-purple
                  hover:text-white hover:bg-purple
                  focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-mint focus:ring-offset-1"
      >
        {props.text} {props.href} {count()}
      </button>
    </Link>
  </div>
);

const ChoiceComponent = props => {
  const buttons = props.choices.map(choice => {
    let text: string = choice[0];
    let ref: string = choice[1] ? choice[1] : "/";
    return <ChoiceButton by={1} text={text} href={ref} />;
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
