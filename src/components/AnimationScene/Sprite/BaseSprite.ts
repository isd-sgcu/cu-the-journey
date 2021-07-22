import { AnimatedSprite, Container, Loader, Texture } from "pixi.js";

type SpriteState = "LOAD" | "PROCESS" | "FINALIZE" | "DONE";

export interface BaseSpriteOptions {
  animationSpeed?: number;
  zIndex?: number;
}

export abstract class BaseSprite extends AnimatedSprite {
  protected state: SpriteState = "LOAD";

  protected onDone?: () => void;

  constructor(resources: string[], options?: BaseSpriteOptions) {
    const loader = Loader.shared;
    const textures = resources
      .map(url => loader.resources[url].texture)
      .filter(texture => typeof texture !== "undefined") as Texture[];
    super(textures);
    super.animationSpeed = options?.animationSpeed ?? 0.04;
    super.zIndex = options?.zIndex || 0;
  }

  abstract updateState(delta: number): void;

  setup(sceneContainer: Container) {
    this.state = "LOAD";
    this.alpha = 0;
    sceneContainer.addChild(this);
  }

  setFinalizing(onDone: () => void) {
    this.onDone = onDone;
    this.state = "FINALIZE";
  }

  reset() {
    this.gotoAndStop(0);
    this.loop = true;
    this.onComplete = undefined;
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getState() {
    return this.state;
  }
}
