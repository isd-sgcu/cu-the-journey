import { BaseSprite } from "./BaseSprite";

export class FadeSprite extends BaseSprite {
  updateState(delta: number): void {
    switch (this.state) {
      case "LOAD":
        if (this.alpha < 1) {
          this.alpha += delta * 0.0196;
        } else {
          this.state = "PROCESS";
        }
        break;
      case "FINALIZE":
        if (this.alpha > 0) {
          this.alpha -= delta * 0.0196;
        } else {
          this.state = "DONE";
          this.onDone?.();
        }
        break;
      default:
        break;
    }
  }
}
