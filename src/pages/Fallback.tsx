import type { Component } from "solid-js";
import { useTransitionContext } from "../context/TransitionContext";
import { sceneTranslator } from "../config/i18n";

const FallbackScene: Component = () => {
  const { fadeOut } = useTransitionContext()!;
  const t = sceneTranslator("fallback");
  return (
    <>
      <h1>404</h1>
      <p>
        {t("line1")}
        <br /> {t("line2")}
      </p>
      <button
        onClick={() => {
          fadeOut("/");
        }}
        class="h-[40px] min-w-[150px] px-[10px] border-[1px] border-purple bg-white rounded-full m-[8px]
      hover:bg-purple-light"
      >
        {t("button")}
      </button>
    </>
  );
};

export default FallbackScene;
