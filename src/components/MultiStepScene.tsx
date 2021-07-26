// ex Scene 8.1 (1) to 8.1 (3) in Figma is considered "one" scene.

import { Link } from "solid-app-router";
import { Component, createSignal, For, Show } from "solid-js";
import { addtText } from "./Text";

export type MultiStepScenePropsType = {
  textKeys: string[];
  nextPage: string;
  t: (key: string, params?: Record<string, string>, defaultValue?: string) => string; // eslint-disable-line
};

const MultiStepScene: Component<MultiStepScenePropsType> = props => {
  const { textKeys, nextPage, t } = props;
  const [step, setStep] = createSignal(0);
  const transitionDur = 300; // ms

  const sceneWithoutLink = (
    <div class="flex justify-center items-center flex-col space-y-[25px]">
      <div class="text-purple text-[16px] text-center leading-[24px] tracking-[0.5px] font-BaiJam font-normal">
        <For each={textKeys}>
          {(key, index) => (
            <span
              style={`transition: color ${transitionDur}ms`}
              class={step() >= index() ? "" : "text-transparent"}
            >
              {addtText(t(key))}
              {index() === textKeys.length ? "" : <br />}
              <br />
            </span>
          )}
        </For>
      </div>
    </div>
  );

  return (
    <>
      <div
        // 375px to match with the visible content width
        class="max-w-[327px]"
        onclick={() => setStep(prev => ++prev)} // eslint-disable-line
      >
        <Show when={step() === textKeys.length - 1} fallback={sceneWithoutLink}>
          <Link href={nextPage}>{sceneWithoutLink}</Link>
        </Show>
      </div>
    </>
  );
};

export default MultiStepScene;
