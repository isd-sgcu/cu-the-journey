import { Application, Loader } from "pixi.js";
import { Accessor, Component, createContext, createSignal, onCleanup, useContext } from "solid-js";
import { Sound, sound } from "@pixi/sound";
import { resources, SoundName, SpriteName } from "./Resources";
import { SceneEngine, SceneSwitchable } from "./SceneEngine";
import { FadeSprite } from "./Sprite/FadeSprite";
import { ZoomSprite } from "./Sprite/ZoomSprite";
import { BaseSprite } from "./Sprite/BaseSprite";

interface ISoundControlOption {
  loop: boolean;
}

interface ISoundControl {
  play: (name: SoundName, options?: ISoundControlOption) => void;
  muted: () => boolean;
}

export interface SceneProviderProps {
  app: Application;
  isLoading: Accessor<boolean>;
  loadProgress: Accessor<number>;
  soundControl: ISoundControl;
  sceneSwitcher: (newScenes: SceneSwitchable, force?: boolean, onNewScene?: () => void) => void;
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
  const [loadProgress, setLoadProgress] = createSignal<number>(0);
  const app = new Application({
    width: 375,
    height: 667,
    antialias: true,
    backgroundColor: 0xffffff,
    resolution: window.devicePixelRatio,
    autoDensity: true,
  });
  const sceneEngine = new SceneEngine(app);
  const loader = Loader.shared;
  loader
    .add(
      Object.values(resources.sprite)
        .map(item => Object.values(item.frames))
        .flatMap(res => res)
        .filter(src => !loader.resources[src]),
    )
    .add(
      Object.values(resources.sound)
        .flatMap(item => item)
        .filter(src => !loader.resources[src]),
    )
    .load(() => {
      const names = Object.keys(resources.sprite) as SpriteName[];
      const sprites = names.map(name => {
        const { frames, type, zIndex } = resources.sprite[name];
        return {
          name,
          sprite:
            type === "Base"
              ? new BaseSprite(frames, { zIndex })
              : type === "Fade"
              ? new FadeSprite(frames, { zIndex })
              : new ZoomSprite(frames, { zIndex }),
        };
      });
      sceneEngine.addScenes(sprites);
      app.ticker.add(delta => {
        sceneEngine.update(delta);
      });
    });

  loader.onComplete.add(() => {
    console.log("All resources are loaded.");
    setLoading(false);
  });

  loader.onProgress.add(({ progress }: Loader) => {
    setLoadProgress(Math.round(progress));
  });

  const soundControl = {
    play: (name: SoundName, options?: ISoundControlOption) => {
      const soundRes: any = loader.resources[resources.sound[name]];
      const playSound: Sound = soundRes.sound;
      if (!playSound.isPlaying) {
        playSound.loop = options?.loop ?? false;
        playSound.play();
      }
    },
    muted: () => sound.toggleMuteAll(),
  };

  onCleanup(() => {
    app.destroy();
    loader.destroy();
  });

  const store = {
    app,
    isLoading,
    loadProgress,
    soundControl,
    sceneSwitcher: sceneEngine.sceneSwitcher,
  };

  return <SceneContext.Provider value={store}>{props.children}</SceneContext.Provider>;
};
