import { useI18n } from "@amoutonbrady/solid-i18n";
import { Route } from "solid-app-router";
import type { Component } from "solid-js";
import "./firebase";

export const App: Component = () => {
  // Set language
  const [, { locale }] = useI18n();
  const language = localStorage.getItem("language");
  if (language === "th" || language === "en") {
    locale(language);
  }

  return (
    <div class="w-screen min-h-screen flex justify-center items-center">
      <div class="w-screen sm:max-w-[375px] min-h-screen sm:min-h-[667px] sm:max-h-[667px] bg-white flex justify-center items-center flex-col text-center">
        <Route />
      </div>
    </div>
  );
};
