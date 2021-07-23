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
    <div
      onclick={() => setStep(prev => ++prev)} // eslint-disable-line
      class="flex h-screen justify-center items-center flex-col space-y-[25px]"
    >
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
      <Show when={step() === textKeys.length} fallback={sceneWithoutLink}>
        <Link href={nextPage}>{sceneWithoutLink}</Link>
      </Show>
    </>
  );
};

export default MultiStepScene;
