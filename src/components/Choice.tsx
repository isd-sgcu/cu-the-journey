import { Accessor, Component, createSignal, onCleanup, onMount } from "solid-js";
import { TransitionFade, useTransitionContext } from "../context/TransitionContext";

interface ChoiceButtonProps {
  href: string;
  text: string;
  isLongBtn: boolean;
  isClick: Accessor<boolean>;
  setClick: (v: boolean | ((prev: boolean) => boolean)) => boolean;
}

interface ChoiceComponentProps {
  question: string | string[];
  choices: string[] | Array<string[]>;
  isLong?: boolean;
}

const ChoiceButton: Component<ChoiceButtonProps> = props => {
  const { fadeOut } = useTransitionContext()!;
  return (
    <>
      <button
        onClick={() => {
          props.setClick(() => fadeOut(props.href));
        }}
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
  const [isClick, setClick] = createSignal(false);
  const buttons = props.choices.map((choice: string | string[]) => {
    const text: string = choice[0];
    const ref: string = choice[1] ? choice[1] : "/";
    return (
      <ChoiceButton
        text={text}
        href={ref}
        isLongBtn={props.isLong || false}
        isClick={isClick}
        setClick={setClick}
      />
    );
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

  const { scheduleFrame, resetAnimationFrame } = useTransitionContext(true)!;

  onMount(() => scheduleFrame(1, 1000));

  onCleanup(() => resetAnimationFrame());

  return (
    <>
      <div class="flex h-screen justify-center items-center z-10">
        <div class="flex flex-col items-center min-w-[20rem]">
          <TransitionFade order={0}>
            <div class="text-center w-[280px] selection:bg-purple selection:text-yellow">
              <h5>{question}</h5>
            </div>
          </TransitionFade>
          <TransitionFade order={1}>{buttons}</TransitionFade>
        </div>
      </div>
    </>
  );
};

export default ChoiceComponent;
