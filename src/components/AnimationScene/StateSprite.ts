import { AnimatedSprite, Container, Loader } from "pixi.js";

type SpriteState = "LOAD" | "PROCESS" | "FINALIZE" | "DONE";

export interface StateSpriteOptions {
  animationSpeed?: number;
  zIndex?: number;
}

export class StateSprite extends AnimatedSprite {
  private state: SpriteState;

  private onDone: () => void;

  constructor(resources: string[], options?: StateSpriteOptions) {
    const loader = Loader.shared;
    const textures = resources.map(url => loader.resources[url].texture);
    super(textures);
    super.animationSpeed = options?.animationSpeed || 0.04;
    super.zIndex = options?.zIndex || 0;
  }

  setup(sceneContainer: Container) {
    this.state = "LOAD";
    this.alpha = 0;
    sceneContainer.addChild(this);
  }

  updateState(delta: number): void {
    switch (this.state) {
      case "LOAD":
        if (this.alpha < 1) {
          this.alpha += delta * 0.08;
        } else {
          this.state = "PROCESS";
        }
        break;
      case "FINALIZE":
        if (this.alpha > 0) {
          this.alpha -= delta * 0.08;
        } else {
          this.state = "DONE";
          if (this.onDone) {
            this.onDone();
          }
        }
        break;
      default:
        break;
    }
  }

  setFinalizing(onDone: () => void) {
    this.onDone = onDone;
    this.state = "FINALIZE";
  }

  getState() {
    return this.state;
  }
}
