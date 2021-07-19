import { TransitionFade, useTransitionContext } from "../context/TransitionContext";

export function AnimationRoute() {
  const { nextAnimationTrigger, scheduleFrame } = useTransitionContext();
  scheduleFrame(5, 2000);
  return (
    <>
      <button onClick={() => nextAnimationTrigger()}>Next frame</button>
      <TransitionFade order={0}>
        <h4>Hello</h4>
      </TransitionFade>
      <TransitionFade order={1}>
        <h4>Hello</h4>
      </TransitionFade>
      <TransitionFade order={2}>
        <h4>Hello</h4>
      </TransitionFade>
      <TransitionFade order={3}>
        <h4>Hello</h4>
      </TransitionFade>
      <TransitionFade order={4}>
        <h4>Hello</h4>
      </TransitionFade>
    </>
  );
}
