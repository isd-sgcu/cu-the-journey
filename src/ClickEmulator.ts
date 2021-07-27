/* eslint-disable no-case-declarations */

enum TouchState { // eslint-disable-line
  IDLE,
  TRACKING,
  IGNORE,
}

const touchSlop = 2;

export class ClickEmulator {
  private downX: number = 0;

  private downY: number = 0;

  private state: TouchState = TouchState.IDLE;

  private handleTouchEvent = (e: TouchEvent) => {
    if (e.touches.length > 1) {
      this.state = TouchState.IGNORE;
    }
    const touch = e.touches[0];
    switch (e.type) {
      case "touchstart":
        this.state = TouchState.TRACKING;
        this.downX = touch.clientX;
        this.downY = touch.clientY;
        break;
      case "touchmove":
        if (this.state !== TouchState.TRACKING) {
          break;
        }
        const diffX = Math.abs(this.downX - touch.clientX);
        const diffY = Math.abs(this.downY - touch.clientY);
        if (diffX > touchSlop || diffY > touchSlop) {
          this.state = TouchState.IGNORE;
        }
        break;
      case "touchend":
      case "touchcancel":
        if (e.type === "touchend" && this.state === TouchState.TRACKING) {
          const target = e.target as HTMLElement;
          const activeElement = document.activeElement as HTMLElement | null;
          if (activeElement !== null && activeElement !== target) {
            activeElement.blur();
          }
          if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
            target.focus();
          }
          target.click();
          e.preventDefault();
        }
        this.state = TouchState.IDLE;
        break;
      default:
        throw new Error("unexpected event type");
    }
  };

  public props = () => {
    if (!navigator?.userAgent?.includes("iPhone OS 15_0")) {
      return {};
    }
    return {
      onTouchStart: this.handleTouchEvent,
      onTouchMove: this.handleTouchEvent,
      onTouchEnd: this.handleTouchEvent,
      onTouchCancel: this.handleTouchEvent,
    };
  };
}
