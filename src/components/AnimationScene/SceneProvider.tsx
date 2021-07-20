import { Application, Loader, utils } from "pixi.js";
import { Component, createContext, onCleanup, useContext } from "solid-js";
import { SceneEngine, SceneSwitchable } from "./SceneEngine";
import { StateSprite } from "./StateSprite";

export interface SceneProviderProps {
  app: Application;
  sceneSwitcher: (newScenes: SceneSwitchable, onNewScene?: () => void) => void; // eslint-disable-line no-unused-vars
}
export const SceneContext = createContext<SceneProviderProps>();

export const useScene = () => useContext<SceneProviderProps>(SceneContext);
export const SceneProvider: Component = props => {
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
