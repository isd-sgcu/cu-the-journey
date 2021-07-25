import { useI18n } from "@amoutonbrady/solid-i18n";
import { Route } from "solid-app-router";
import { Component, createEffect, createSignal, onCleanup, Show } from "solid-js";
import AnimationScene, { useScene } from "./components/AnimationScene";
import { TransitionProvider, TransitionFade } from "./context/TransitionContext";
import "./firebase";

export const App: Component = () => {
  // Set language
  const [, { locale }] = useI18n();
  const language = localStorage.getItem("language");
  if (language === "th" || language === "en") {
    locale(language);
  }

  const { app, soundControl, loadProgress, isLoading } = useScene();
  const resizeObserver = new ResizeObserver(() => {
    if (app.renderer) {
      app.resize?.();
      app.render?.();
    }
  });

  const [isFullScreen, setFullScreen] = createSignal(true);
  createEffect(() => {
    if (!isLoading()) {
      setFullScreen(false);
    }
  });

  onCleanup(() => {
    resizeObserver.disconnect();
  });

  return (
    <div
      class="relative w-screen min-h-screen flex justify-center items-center"
      style="
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */"
    >
      <div
        ref={ref => {
          app.resizeTo = ref;
          resizeObserver.observe(ref);
        }}
        class={`transition-all duration-4000 ease-in-out w-screen min-h-screen flex justify-center items-center flex-col text-center ${
          isFullScreen() ? "" : "sm:w-[375px] sm:min-h-[667px]"
        } `}
      >
        <Show when={!isLoading()} fallback={<div>Loading... {loadProgress()} %</div>}>
          <TransitionProvider>
            <TransitionFade order={0}>
              <Route />
            </TransitionFade>
          </TransitionProvider>
        </Show>
        <AnimationScene />
      </div>
      <div class="absolute left-0 top-0 bg-white flex flex-col z-20">
        <button onclick={() => soundControl.muted()}>toggle mute</button>
      </div>
    </div>
  );
};
