import { onMount } from "solid-js";
import { TransitionFade, useTransitionContext } from "../context/TransitionContext";

export function AnimationRoute() {
  const { scheduleFrame } = useTransitionContext();

  onMount(() => {
    scheduleFrame(5, 1000);
  });

  return (
    <div class="flex items-center justify-center flex-col">
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
    </div>
  );
}
