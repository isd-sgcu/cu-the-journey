import { useI18n } from "@amoutonbrady/solid-i18n";
import { Route } from "solid-app-router";
import { Component, createEffect } from "solid-js";
import AnimationScene, { useScene } from "./components/AnimationScene";
import "./firebase";

export const App: Component = () => {
  // Set language
  const [, { locale }] = useI18n();

  let screenRef: HTMLDivElement;
  const { app, sceneSwitcher } = useScene();

  const language = localStorage.getItem("language");
  if (language === "th" || language === "en") {
    locale(language);
  }

  createEffect(() => {
    app.resizeTo = screenRef;
  });

  return (
    <div class="w-screen min-h-screen flex justify-center items-center">
      <div
        ref={screenRef}
        class="w-screen sm:max-w-[375px] min-h-screen sm:min-h-[667px] sm:max-h-[667px] flex justify-center items-center flex-col text-center z-10"
      >
        <Route />
      </div>
      <AnimationScene />
      <div class="absolute left-0 top-0 bg-white flex flex-col z-20">
        <button onclick={() => sceneSwitcher(["bird", "ogbg"])}>Bird</button>
        <button onclick={() => sceneSwitcher(["ogbg"])}>remove Bird</button>
      </div>
    </div>
  );
};
