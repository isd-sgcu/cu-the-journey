import { useRouter } from "solid-app-router";
import { createEffect, onMount } from "solid-js";
import BackgroundMapping, { BackgroundMappingProps } from "../../context/BackgroundMapping";
import { useFadeSignal } from "../../context/FadeSignalContext";
import { useScene, SceneProvider } from "./SceneProvider";

export default () => {
  let sceneRef: HTMLDivElement;
  const { app, sceneSwitcher, isLoading, soundControl } = useScene();
  const { current } = useFadeSignal();
  const [router] = useRouter()!;

  onMount(() => {
    sceneRef.appendChild(app.view);
  });

  createEffect(() => {
    if (!isLoading()) {
      const next = BackgroundMapping()[current()];
      if (!next) {
        sceneSwitcher([]);
      } else if (Array.isArray(next)) {
        sceneSwitcher(next);
      } else {
        sceneSwitcher(next.scene, next.force);
      }
    }
  });

  createEffect(() => {
    if (!isLoading()) {
      if (!["/", "/door-open"].includes(router.current[0].path)) {
        soundControl.play("bg");
      }
    }
  });

  return (
    <div
      id="pixi-canvas"
      class="absolute -z-10"
      ref={ref => {
        sceneRef = ref;
      }}
    ></div>
  );
};

export { useScene, SceneProvider };
