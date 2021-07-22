import { Application, Loader } from "pixi.js";
import { Accessor, Component, createContext, createSignal, onCleanup, useContext } from "solid-js";
import { Sound, sound } from "@pixi/sound";
import { resources, SoundName, SpriteName } from "./Resources";
import { SceneEngine, SceneSwitchable } from "./SceneEngine";
import { FadeSprite } from "./Sprite/FadeSprite";

interface ISoundControl {
  play: (name: SoundName) => void;
  muted: () => boolean;
}

export interface SceneProviderProps {
  app: Application;
  isLoading: Accessor<boolean>;
  soundControl: ISoundControl;
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
  const [isLoading, setLoading] = createSignal<boolean>(true);
  const app = new Application({
    width: 375,
    height: 667,
    antialias: true,
    backgroundColor: 0xffffff,
    resolution: 1,
  });
  const sceneEngine = new SceneEngine(app);
  const loader = Loader.shared;
  loader
    .add(
      Object.values(resources)
        .flatMap(collet => Object.values(collet))
        .flatMap(res => res)
        .filter(src => !loader.resources[src]),
    )
    .load(() => {
      const names = Object.keys(resources.sprite) as SpriteName[];
      const sprites = names.map(name => ({
        name,
        sprite: new FadeSprite(resources.sprite[name])
      }));
      sceneEngine.addScenes(sprites);
      app.ticker.add(delta => {
        sceneEngine.update(delta);
      });
    });

  loader.onComplete.add(() => {
    setLoading(false);
    console.log("All resources are loaded.");
  });

  loader.onProgress.add(({ progress }: Loader) => {
    console.log(`Load resources: ${Math.round(progress)} %`);
  });

  const soundControl = {
    play: (name: SoundName) => {
      if (isLoading()) return;
      const soundRes: any = loader.resources[resources.sound[name]];
      const playSound: Sound = soundRes.sound;
      if (!playSound.isPlaying) {
        playSound.play();
      }
    },
    muted: () => sound.toggleMuteAll()
  };

  onCleanup(() => {
    app.destroy();
    loader.destroy();
  });

  const store = {
    app,
    soundControl,
    isLoading,
    sceneSwitcher: sceneEngine.sceneSwitcher
  };

  return <SceneContext.Provider value={store}>{props.children}</SceneContext.Provider>;
};
