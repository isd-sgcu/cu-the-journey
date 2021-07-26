import { Component, For, JSX, onMount } from "solid-js";
import { TransitionFade, useTransitionContext } from "../context/TransitionContext";

interface IAnimationRoute {
  children: JSX.Element[];
}

export const AnimationRoute: Component<IAnimationRoute> = props => {
  const { scheduleFrame } = useTransitionContext();
  const { children } = props;

  onMount(() => {
    scheduleFrame(children.length - 1);
  });

  return (
    <div class="flex items-center justify-center flex-col">
      <For each={children}>
        {(elem, index) => <TransitionFade order={index()}>{elem}</TransitionFade>}
      </For>
    </div>
  );
};
