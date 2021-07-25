import { Application, Container } from "pixi.js";
import type { SpriteName } from "./Resources";
import type { BaseSprite } from "./Sprite/BaseSprite";

export interface SpriteSetting {
  name?: string;
  sprite: BaseSprite;
}

export interface SceneSwitcherOption {
  name: SpriteName;
  loop?: boolean;
  animationSpeed?: number;
  onComplete?: () => void;
}

export type SceneSwitchable = Array<SpriteName | SceneSwitcherOption>;

export class SceneEngine {
  private sceneLists: SpriteSetting[];

  private sceneContainer: Container;

  private removeContainer: Container;

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

    this.removeContainer = new Container();

    this.sceneContainer.sortableChildren = true;
    this.app.stage.addChild(this.removeContainer, this.sceneContainer);
  }

  addScenes(sceneLists: SpriteSetting[]) {
    this.sceneLists = sceneLists;
  }

  clearSprite(sprite: BaseSprite) {
    this.removeContainer.removeChild(sprite);
    sprite.reset();
  }

  sceneSwitcher = (
    newScenes: SceneSwitchable,
    force: boolean = false,
    onNewScene: (() => void) | undefined = undefined,
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
        scene.sprite.setFinalizing(() => this.clearSprite(scene.sprite));
        this.sceneContainer.removeChild(scene.sprite);
        this.removeContainer.addChild(scene.sprite);
        this.willRemoveScene.push(scene);
      }
    });

    const intersectScenes: SpriteSetting[] = [];

    mappedScenes.forEach(({ name: newName, loop = true, animationSpeed = 0.02, onComplete }) => {
      const oldScene = this.currentScene.find(({ name }) => name === newName);
      if (oldScene) {
        if (loop !== oldScene.sprite.loop) {
          oldScene.sprite.gotoAndPlay(oldScene.sprite.currentFrame);
        }
        oldScene.sprite.loop = loop;
        oldScene.sprite.onComplete = onComplete;
        intersectScenes.push(oldScene);
      } else {
        const newScene = this.sceneLists.find(({ name }) => name === newName);
        if (!newScene) {
          throw new Error(`unknown scene name: ${newName}`);
        }
        newScene.sprite.loop = loop;
        newScene.sprite.animationSpeed = animationSpeed;
        newScene.sprite.onComplete = onComplete;
        this.willAddScene.push(newScene);
      }
    });

    this.currentScene = intersectScenes;

    // force add when not have sprite to remove or force
    if (this.willRemoveScene.length === 0 || force) {
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
      sprite.resizeToApp(this.app);
    });

    if (this.willRemoveScene.length !== 0) {
      if (this.willRemoveScene.every(({ sprite }) => sprite.getState() === "DONE")) {
        this.applyWillAddScene();
        this.willRemoveScene = []; // clear
      }
    }

    // update container position
    this.removeContainer.x = width / 2;
    this.removeContainer.y = height / 2;
    this.removeContainer.pivot.x = this.removeContainer.width / 2;
    this.removeContainer.pivot.y = this.removeContainer.height / 2;

    this.sceneContainer.x = width / 2;
    this.sceneContainer.y = height / 2;
    this.sceneContainer.pivot.x = this.sceneContainer.width / 2;
    this.sceneContainer.pivot.y = this.sceneContainer.height / 2;
  }
}
