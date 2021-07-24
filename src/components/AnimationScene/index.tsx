import { onMount } from "solid-js";
import { useScene, SceneProvider } from "./SceneProvider";

export default () => {
  let sceneRef: HTMLDivElement;
  const scene = useScene();

  onMount(() => {
    sceneRef.appendChild(scene.app.view);
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
