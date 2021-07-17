import { Component, createEffect, createSignal, onMount } from "solid-js";
import { Application, Loader } from "pixi.js";
import { useRouter } from "solid-app-router";
import { SceneEngine } from "./SceneEngine";
import { Scene } from "./Scene";

export const AnimationScene: Component = () => {
  // const [isLoading, setLoading] = createSignal(true);
  const [squeeze, setSqueeze] = createSignal(false);
  const [router] = useRouter();
  let sceneRef: HTMLDivElement;
  const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    backgroundColor: 0xffffff,
    resolution: 1
  });

  const loader = Loader.shared;

  const sceneEngine = new SceneEngine(app);

  loader.add("images/spritesheet.json").load(() => {
    sceneEngine.addScenes([
      {
        name: "scene1",
        scene: new Scene("walk", 0.167)
      },
      {
        name: "scene2",
        scene: new Scene("slime", 0.167)
      }
    ]);

    const dtwWidth = app.view.width - 375;
    const dtHeight = app.view.height - 667;

    app.ticker.add(delta => {
      sceneEngine.update(delta);

      if (squeeze()) {
        if (app.view.width > 375) app.view.width -= Math.ceil((delta * dtwWidth) / 300);
        if (app.view.height > 667) app.view.height -= Math.ceil((delta * dtHeight) / 300);
      }
    });
  });

  // loader.onComplete.add(() => setLoading(false));

  const handleClick = (sceneName: string) => {
    sceneEngine.sceneSwitcher(sceneName);
  };

  onMount(() => {
    sceneRef.appendChild(app.view);
  });

  createEffect(() => {
    console.log(router.current);
  });

  return (
    <>
      <div ref={sceneRef}></div>
      <div class="absolute top-0 left-0 bg-white">
        <button onclick={() => handleClick("scene1")}>scene1</button>
        <br />
        <button onclick={() => handleClick("scene2")}>scene2</button>
        <br />
        <button onclick={() => setSqueeze(true)}>resize</button>
        <br />
        <button onclick={() => window.location.reload()}>refresh</button>
      </div>
    </>
  );
};
