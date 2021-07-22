import { Application, Container } from "pixi.js";
import type { SpriteName } from "./Resources";
import type { StateSprite } from "./StateSprite";

export interface SpriteSetting {
  name?: string;
  sprite: StateSprite;
}

export interface SceneSwitcherOption {
  name: SpriteName;
  loop?: boolean;
  onComplete?: () => void;
}

export type SceneSwitchable = Array<SpriteName | SceneSwitcherOption>;

export class SceneEngine {
  private sceneLists: SpriteSetting[];

  private sceneContainer: Container;

  private app: Application;

  private currentScene: SpriteSetting[];

  private willAddScene: SpriteSetting[];

  private willRemoveScene: SpriteSetting[];

  onNewScene?: () => void;

  constructor(app: Application) {
    this.app = app;
    this.sceneLists = [];
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

  sceneSwitcher = (
    newScenes: SceneSwitchable,
    onNewScene: (() => void) | undefined = undefined
  ) => {
    this.onNewScene = onNewScene;
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

    mappedScenes.forEach(({ name: newName, loop = true, onComplete }) => {
      const oldScene = this.currentScene.find(({ name }) => name === newName);
      if (oldScene) {
        if (loop !== oldScene.sprite.loop) {
          oldScene.sprite.gotoAndPlay(oldScene.sprite.currentFrame);
        }
        oldScene.sprite.loop = loop;
        oldScene.sprite.onComplete = onComplete;
        oldScenes.push(oldScene);
      } else {
        const nextScene = this.sceneLists.find(({ name }) => name === newName);
        if (!nextScene) {
          console.log(`unknown scene name: ${newName}`);
          return;
        }
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
    const { width, height } = this.app.screen;
    [...this.currentScene, ...this.willRemoveScene].forEach(({ sprite }) => {
      sprite.updateState(delta);
      const ratio = Math.max(width / sprite.width, height / sprite.height);
      sprite.width = Math.ceil(sprite.width * ratio); // eslint-disable-line no-param-reassign
      sprite.height = Math.ceil(sprite.height * ratio); // eslint-disable-line no-param-reassign
    });

    if (this.willRemoveScene.length !== 0) {
      if (this.willRemoveScene.every(({ sprite }) => sprite.getState() === "DONE")) {
        this.applyWillAddScene();
        this.willRemoveScene = []; // clear
      }
    }

    // update container size
    this.sceneContainer.x = width / 2;
    this.sceneContainer.y = height / 2;
    this.sceneContainer.pivot.x = this.sceneContainer.width / 2;
    this.sceneContainer.pivot.y = this.sceneContainer.height / 2;
  }
}
