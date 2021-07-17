import { AnimatedSprite, Container, Loader } from "pixi.js";

type SceneState = "LOAD" | "PROCESS" | "FINALIZE" | "DONE";

export class Scene {
  private sceneState: SceneState;

  private scene: AnimatedSprite;

  private onDone: () => void;

  constructor(spriteName: string, animationSpeed: number) {
    const loader = Loader.shared;
    const sheet = loader.resources["images/spritesheet.json"].spritesheet;
    this.scene = new AnimatedSprite(sheet.animations[spriteName]);
    this.scene.animationSpeed = animationSpeed;
  }

  setup(sceneContainer: Container) {
    this.sceneState = "LOAD";
    this.scene.alpha = 0;
    sceneContainer.addChild(this.scene);
  }

  update(delta: number): void {
    switch (this.sceneState) {
      case "LOAD":
        if (this.scene.alpha < 1) {
          this.scene.alpha += delta * 0.08;
        } else {
          this.sceneState = "PROCESS";
        }
        break;
      case "FINALIZE":
        if (this.scene.alpha > 0) {
          this.scene.alpha -= delta * 0.08;
        } else {
          this.sceneState = "DONE";
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
    this.sceneState = "FINALIZE";
  }

  play() {
    this.scene.play();
  }
}
