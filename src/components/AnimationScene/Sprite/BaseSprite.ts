import { AnimatedSprite, Application, Container, Loader, Texture } from "pixi.js";

type SpriteState = "LOAD" | "PROCESS" | "FINALIZE" | "DONE";

export interface BaseSpriteOptions {
  animationSpeed?: number;
  zIndex?: number;
}

export class BaseSprite extends AnimatedSprite {
  protected state: SpriteState = "LOAD";

  protected onDone?: () => void;

  constructor(resources: string[], options?: BaseSpriteOptions) {
    const loader = Loader.shared;
    const textures = resources
      .map(url => loader.resources[url].texture)
      .filter(texture => typeof texture !== "undefined") as Texture[];
    super(textures);
    super.animationSpeed = options?.animationSpeed ?? 0.02;
    super.zIndex = options?.zIndex || 0;
  }

  updateState(_delta: number): void {
    switch (this.state) {
      case "LOAD":
        this.state = "PROCESS";
        break;
      case "FINALIZE":
        this.state = "DONE";
        this.onDone?.();
        break;
      default:
        break;
    }
  }

  resizeToApp(app: Application) {
    const { width, height } = app.screen;
    const ratio = Math.max(width / this.width, height / this.height);
    const newWidth = Math.round(this.width * ratio);
    const newHeight = Math.round(this.height * ratio);
    this.setSize(newWidth, newHeight);
  }

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
