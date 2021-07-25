import type { Application } from "pixi.js";
import { BaseSprite } from "./BaseSprite";

export class ZoomSprite extends BaseSprite {
  // override
  updateState(delta: number): void {
    switch (this.state) {
      case "LOAD":
        if (this.alpha < 1) {
          this.alpha += delta * 0.0196;
        } else {
          this.state = "PROCESS";
        }
        break;
      case "FINALIZE": {
        const scale = this.scale.x;
        if (scale < 2) {
          this.alpha -= delta * 0.0196;
          const newScale = scale + delta * 0.0392;
          this.scale.set(newScale, newScale);
        } else {
          this.state = "DONE";
          this.onDone?.();
        }
        break;
      }
      default:
        break;
    }
  }

  // override
  resizeToApp(app: Application) {
    if (this.state === "FINALIZE") {
      return;
    }
    const { width, height } = app.screen;
    const ratio = Math.max(width / this.width, height / this.height);
    const newWidth = Math.round(this.width * ratio);
    const newHeight = Math.round(this.height * ratio);
    this.setSize(newWidth, newHeight);
  }
}
