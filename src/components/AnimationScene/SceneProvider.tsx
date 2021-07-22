import { Application, Loader } from "pixi.js";
import { Component, createContext, onCleanup, useContext } from "solid-js";
import { resources, SpriteName } from "./Resources";
import { SceneEngine, SceneSwitchable } from "./SceneEngine";
import { FadeSprite } from "./Sprite/FadeSprite";

export interface SceneProviderProps {
  app: Application;
  sceneSwitcher: (newScenes: SceneSwitchable, onNewScene?: () => void) => void;
}
export const SceneContext = createContext<SceneProviderProps>();

export const useScene = () => {
  const scene = useContext(SceneContext);
  if (typeof scene === "undefined") {
    throw new Error("Can't find scene provider");
  }
  return scene;
};

export const SceneProvider: Component = props => {
  const app = new Application({
    width: 375,
    height: 667,
    antialias: true,
    backgroundColor: 0xffffff,
    resolution: 1
  });

  const sceneEngine = new SceneEngine(app);
  const loader = Loader.shared;
  loader
    .add(
      Object.values(resources)
        .flatMap(res => res)
        .filter(src => !loader.resources[src])
    )
    .load(() => {
      const names = Object.keys(resources) as SpriteName[];
      const sprites = names.map(name => ({
        name,
        sprite: new FadeSprite(resources[name])
      }));
      sceneEngine.addScenes(sprites);
      app.ticker.add(delta => {
        sceneEngine.update(delta);
      });
    });
  loader.onComplete.add(() => console.log("load all resource completed"));

  onCleanup(() => {
    app.destroy();
    loader.destroy();
  });

  const store = {
    app,
    sceneSwitcher: sceneEngine.sceneSwitcher
  };

  return <SceneContext.Provider value={store}>{props.children}</SceneContext.Provider>;
};
