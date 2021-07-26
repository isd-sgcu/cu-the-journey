import { useI18n } from "@amoutonbrady/solid-i18n";
import { Route } from "solid-app-router";
import { Component, createEffect, createSignal, onCleanup, Show } from "solid-js";
import AnimationScene, { useScene } from "./components/AnimationScene";
import { TransitionProvider, TransitionFade } from "./context/TransitionContext";
import "./firebase";
import { StorableKeys } from "./MessageStore";
import { ENGLISH_SIGNATURE, THAI_SIGNATURE } from "./pages/TextReplacer";

export const App: Component = () => {
  // Set language
  const [, { locale }] = useI18n();
  const language = localStorage.getItem(StorableKeys.LanguageKey);
  if (!language) {
    localStorage.setItem(StorableKeys.LanguageKey, THAI_SIGNATURE);
    locale(THAI_SIGNATURE);
  } else if (language === THAI_SIGNATURE || language === ENGLISH_SIGNATURE) {
    locale(language);
  }

  const { app, loadProgress, isLoading } = useScene();
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
    <div>
      <div id="swal"></div>
      <div
        class="relative w-screen min-h-screen flex justify-center items-center"
        style="
        -webkit-tap-highlight-color: transparent; /* Mobile */
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
      </div>
    </div>
  );
};
