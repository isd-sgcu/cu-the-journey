import { Application, Container } from "pixi.js";
import type { StateSprite } from "./StateSprite";

export interface SpriteSetting {
  name?: string;
  sprite: StateSprite;
}

export interface SceneSwitcherOption {
  name: string;
  loop?: boolean;
  onComplete?: () => void;
}

export type SceneSwitchable = Array<string | SceneSwitcherOption>;

export class SceneEngine {
  private sceneLists: SpriteSetting[];

  private sceneContainer: Container;

  private app: Application;

  private currentScene: SpriteSetting[];

  private willAddScene: SpriteSetting[];

  private willRemoveScene: SpriteSetting[];

  onNewScene: () => void;

  constructor(app: Application) {
    this.app = app;
    this.currentScene = [];
    this.willAddScene = [];
    this.willRemoveScene = [];
    this.sceneContainer = new Container();

    this.sceneContainer.sortableChildren = true;

    this.app.stage.addChild(this.sceneContainer);
  }

  addScenes(sceneLists: SpriteSetting[]) {
    this.sceneLists = sceneLists;
  }

  resetStateSprites(sprite: StateSprite) {
    this.sceneContainer.removeChild(sprite);
    sprite.gotoAndStop(0);
    sprite.onComplete = undefined; // eslint-disable-line no-param-reassign
    sprite.loop = true; // eslint-disable-line no-param-reassign
  }

  sceneSwitcher = (newScenes: SceneSwitchable) => {
    const mappedScenes: SceneSwitcherOption[] = newScenes.map(scene => {
      if (typeof scene === "string") {
        return { name: scene };
      }
      return scene;
    });

    this.currentScene.forEach(scene => {
      if (!mappedScenes.find(({ name }) => name === scene.name)) {
        scene.sprite.setFinalizing(() => this.resetStateSprites(scene.sprite));
        this.willRemoveScene.push(scene);
      }
    });

    const oldScenes: SpriteSetting[] = [];

    mappedScenes.forEach(({ name, loop = true, onComplete }) => {
      const oldScene = this.currentScene.find(scene => scene.name === name);
      if (oldScene) {
        if (loop !== oldScene.sprite.loop) {
          oldScene.sprite.gotoAndPlay(oldScene.sprite.currentFrame);
        }
        oldScene.sprite.loop = loop;
        oldScene.sprite.onComplete = onComplete;
        oldScenes.push(oldScene);
      } else {
        const nextScene = this.sceneLists.find(sceneSetting => sceneSetting.name === name);
        nextScene.sprite.loop = loop;
        nextScene.sprite.onComplete = onComplete;
        this.willAddScene.push(nextScene);
      }
    });

    this.currentScene = oldScenes;

    // force add when not have sprite to remove
    if (this.willRemoveScene.length === 0) {
      this.applyWillAddScene();
    }
  };

  setupScene(sceneSetting: SpriteSetting) {
    const { sprite } = sceneSetting;
    sprite.setup(this.sceneContainer);
    sprite.play();
  }

  private applyWillAddScene() {
    this.willAddScene.forEach(scene => {
      this.setupScene(scene);
      this.currentScene.push(scene);
    });
    this.willAddScene = []; // clear
    if (this.onNewScene) {
      this.onNewScene();
      this.onNewScene = undefined;
    }
  }

  update(delta: number) {
    this.currentScene.forEach(scene => scene.sprite.updateState(delta));
    this.willRemoveScene.forEach(scene => scene.sprite.updateState(delta));

    if (this.willRemoveScene.length !== 0) {
      if (this.willRemoveScene.every(({ sprite }) => sprite.getState() === "DONE")) {
        this.applyWillAddScene();
        this.willRemoveScene = []; // clear
      }
    }
  }
}
