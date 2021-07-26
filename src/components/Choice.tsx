import { Accessor, Component, createSignal, onMount } from "solid-js";
import { TransitionFade, useTransitionContext } from "../context/TransitionContext";

interface ChoiceButtonProps {
  href: string;
  text: string;
  isClick: Accessor<boolean>;
  setClick: (v: boolean | ((prev: boolean) => boolean)) => boolean;
}

interface ChoiceComponentProps {
  question: string | string[];
  choices: string[] | Array<string[]>;
}

const ChoiceButton: Component<ChoiceButtonProps> = props => {
  const { fadeOut } = useTransitionContext()!;
  return (
    <>
      <button
        onClick={() => {
          props.setClick(() => fadeOut(props.href));
        }}
        class={`break-words min-w-[150px] py-2 max-w-[100%] w-[100%] min-h-[40px] mt-[16px] rounded-full px-3 border-[1px] border-purple bg-white
                hover:bg-purple-light
                focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-mint focus:ring-offset-1`}
      >
        {props.text}
      </button>
    </>
  );
};

const getButtons = (choices: string[] | string[][]) => {
  const [isClick, setClick] = createSignal(false);
  return choices.map((choice: string | string[]) => {
    const text: string = choice[0];
    const ref: string = choice[1] ? choice[1] : "/";
    return <ChoiceButton text={text} href={ref} isClick={isClick} setClick={setClick} />;
  });
};

const ChoiceComponent: Component<ChoiceComponentProps> = props => {
  const buttons = getButtons(props.choices);
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

  const { scheduleFrame } = useTransitionContext(true)!;

  onMount(() => scheduleFrame(1));

  return (
    <>
      <div class="flex justify-center items-center z-10 max-w-[327px]">
        <div class="flex flex-col items-center min-w-[20rem]">
          <TransitionFade order={0}>
            <div class="text-center selection:bg-purple selection:text-yellow mb-[6.5px]">
              <h5>{question}</h5>
            </div>
          </TransitionFade>
          <TransitionFade order={1}>
            <div class="flex flex-col">{buttons}</div>
          </TransitionFade>
        </div>
      </div>
    </>
  );
};

export default ChoiceComponent;
export { getButtons };
