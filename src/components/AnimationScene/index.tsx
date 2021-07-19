import { Component, createEffect, onCleanup, onMount, splitProps } from "solid-js";
import { Application, Loader, utils } from "pixi.js";
import { SceneEngine, SceneSwitchable } from "./SceneEngine";
import { StateSprite } from "./StateSprite";

export const AnimationScene: Component<{ sprites?: SceneSwitchable }> = props => {
  const [local] = splitProps(props, ["sprites"]);
  let sceneRef: HTMLDivElement;
  const app = new Application({
    width: 375,
    height: 667,
    antialias: true,
    transparent: true,
    resolution: 1
  });

  const sceneEngine = new SceneEngine(app);

  const resources = ["images/spritesheet.json"];

  const loader = Loader.shared;
  loader
    .add(resources.filter(src => !utils.TextureCache[src] && !utils.TextureCache[`${src}_image`]))
    .load(() => {
      const sprites = [
        {
          name: "A",
          sprite: new StateSprite("walk", { animationSpeed: 0.167, zIndex: 1 })
        },
        {
          name: "B",
          sprite: new StateSprite("slime", { animationSpeed: 0.167, zIndex: 2, x: 100 })
        }
      ];
      sceneEngine.addScenes(sprites);
      app.ticker.add(delta => {
        sceneEngine.update(delta);
      });
    });
  loader.onComplete.add(() => console.log("load all resource completed"));

  onMount(() => {
    sceneRef.appendChild(app.view);
  });

  createEffect(() => {
    sceneEngine.sceneSwitcher(local.sprites || []);
  });

  onCleanup(() => {
    app.destroy();
    loader.destroy();
  });

  return <div ref={sceneRef}></div>;
};
