import { Application, Container } from "pixi.js";
import type { Scene } from "./Scene";

export interface SceneSetting {
  name?: string;
  scene: Scene;
}

export class SceneEngine {
  private sceneLists: SceneSetting[];

  private app: Application;

  private currentScene: SceneSetting;

  constructor(app: Application) {
    this.app = app;
    this.currentScene = undefined;
  }

  addScenes(sceneLists: SceneSetting[]) {
    this.sceneLists = sceneLists;
  }

  sceneSwitcher = (sceneName: string) => {
    if (this.currentScene?.name === sceneName) {
      console.log("same scene");
      return;
    }

    const nextScene = this.sceneLists.find(sceneSetting => sceneSetting.name === sceneName);
    if (!nextScene) {
      console.error(`SCENE NOT FOUND: ${sceneName}`);
      return;
    }
    if (this.currentScene) {
      this.currentScene.scene.setFinalizing(() => {
        this.setupScene(nextScene);
        this.currentScene = nextScene;
      });
    } else {
      this.setupScene(nextScene);
      this.currentScene = nextScene;
    }
  };

  setupScene(sceneSetting: SceneSetting) {
    this.app.stage.removeChildren();
    const sceneContainer = new Container();
    this.app.stage.addChild(sceneContainer);
    const { scene } = sceneSetting;

    scene.setup(sceneContainer);
    scene.play();
  }

  update(delta: number) {
    if (this.currentScene) this.currentScene.scene.update(delta);
  }
}
