import { Component, For, JSX, onCleanup, onMount } from "solid-js";
import { TransitionFade, useTransitionContext } from "../context/TransitionContext";

interface IAnimationRoute {
  children: JSX.Element[];
  transitionDur?: number; // ms
}

export const AnimationRoute: Component<IAnimationRoute> = props => {
  const { scheduleFrame, resetAnimationFrame } = useTransitionContext();
  const { children, transitionDur } = props;

  onMount(() => {
    scheduleFrame(children.length - 1, transitionDur || 1000);
  });

  // For some reason we needs to add this in order to not having problem when
  // transition from page 13-0 to 13-3 (maybe because of lifecycle)
  onCleanup(() => {
    resetAnimationFrame();
  });

  return (
    <div class="flex items-center justify-center flex-col">
      <For each={children}>
        {(elem, index) => <TransitionFade order={index()}>{elem}</TransitionFade>}
      </For>
    </div>
  );
};
