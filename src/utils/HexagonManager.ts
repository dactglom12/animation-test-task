import { ElementsFactory } from "./ElementsFactory";

type Coordinates = {
  x: number;
  y: number;
};

type AnimationContext = {
  isEvenColumn?: boolean;
  isAnimationDone?: boolean;
  columnPositionX?: number;
  lastAnimationTimestamp?: number;
  animationId?: number;
};

const HEXAGON_HEIGHT_PX = 240;
const ANIMATION_INTERVAL_MS = 50;

export class HexagonManager {
  private lastHexagonId: number;
  private animationContext: AnimationContext;
  private classNames = {
    hexagon: "hexagon",
  };
  private postfixes = {
    fill: "fill",
  };
  private container: HTMLElement;
  private hexagonColor: string;

  constructor(c: HTMLElement, color: string) {
    this.animationContext = {};
    this.lastHexagonId = 0;
    this.container = c;
    this.hexagonColor = color;
  }

  setColor(color: string) {
    this.hexagonColor = color;

    return this;
  }

  private drawHegaxon(coordinates: Coordinates) {
    const div = ElementsFactory.createElement({
      className: `${this.classNames.hexagon} ${this.postfixes.fill}`,
      elementType: "div",
    });

    div.style.position = "absolute";
    div.style.left = coordinates.x + "px";
    div.style.top = coordinates.y + "px";
    div.style.backgroundColor = this.hexagonColor;

    div.id = String(this.lastHexagonId);

    // if (this.animationType === AnimationTypes.DISAPPEAR) {
    //   div.onanimationend = () => {
    //     this.container.removeChild(div);
    //   };
    // }

    this.container.appendChild(div);

    this.lastHexagonId += 1;
  }

  private getColumnElementsNumber() {
    const viewportHeight = window.innerHeight;

    const hexagonsNumber = Math.ceil(viewportHeight / HEXAGON_HEIGHT_PX);

    return hexagonsNumber;
  }

  private drawHexagonsColumn(x: number, isEven?: boolean) {
    let pointY = isEven ? 0 : -(HEXAGON_HEIGHT_PX * 0.75);
    const jump = HEXAGON_HEIGHT_PX * 1.5;

    for (let i = 0; i < this.getColumnElementsNumber(); i++) {
      this.drawHegaxon({ x, y: pointY });

      pointY += jump;
    }
  }

  private step(timestamp: number, onAnimationEnd: () => void) {
    if (!this.animationContext.lastAnimationTimestamp) {
      this.animationContext = {
        ...this.animationContext,
        lastAnimationTimestamp: timestamp,
        isAnimationDone: false,
        isEvenColumn: true,
        columnPositionX: -100,
      };
    }

    if (this.animationContext.columnPositionX > window.innerWidth) {
      onAnimationEnd();
      return;
    }

    const elapsed = timestamp - this.animationContext.lastAnimationTimestamp;

    const shouldAnimationTrigger = elapsed > ANIMATION_INTERVAL_MS;

    if (shouldAnimationTrigger) {
      this.drawHexagonsColumn(
        this.animationContext.columnPositionX!,
        this.animationContext.isEvenColumn
      );

      this.animationContext = {
        ...this.animationContext,
        columnPositionX:
          this.animationContext.columnPositionX! + HEXAGON_HEIGHT_PX / 2,
        isEvenColumn: !this.animationContext.isEvenColumn,
        lastAnimationTimestamp: timestamp,
      };
    }

    window.requestAnimationFrame((t) => this.step(t, onAnimationEnd));
  }

  startAnimation(finishingCallback: () => void) {
    this.animationContext = {};

    const animationId = window.requestAnimationFrame((t) =>
      this.step(t, finishingCallback)
    );

    this.animationContext = { ...this.animationContext, animationId };
  }
}
