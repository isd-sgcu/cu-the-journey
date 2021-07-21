import { Application, Loader } from "pixi.js";
import { Component, createContext, onCleanup, useContext } from "solid-js";
import { resources } from "./Resources";
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
    backgroundColor: 0xffffff,
    resolution: 1
  });

  const sceneEngine = new SceneEngine(app);
  const loader = Loader.shared;
  loader
    .add([].concat(...Object.values(resources)).filter(src => !loader.resources[src]))
    .load(() => {
      const sprites = Object.keys(resources).map(name => ({
        name,
        sprite: new StateSprite(resources[name])
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
