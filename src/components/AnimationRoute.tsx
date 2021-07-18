import { TransitionFade, useTransitionContext } from "../context/TransitionContext";

export function AnimationRoute() {
  const { nextAnimationTrigger } = useTransitionContext();
  return (
    <>
      <button onClick={() => nextAnimationTrigger()}>Next frame</button>
      <TransitionFade order={0}>
        <h4>Hello</h4>
      </TransitionFade>
      <TransitionFade order={1}>
        <h4>Hello</h4>
      </TransitionFade>
    </>
  );
}
