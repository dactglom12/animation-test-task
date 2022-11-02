import { Scene } from "../interfaces";
import { ElementsFactory } from "../utils/ElementsFactory";

export class FirstScene implements Scene {
  private sceneContainer =
    document.getElementsByClassName("scene-container")[0];

  private classNames = {
    goal: "goal",
    firstSceneContainer: "first-scene-container",
    kitContainer: "kit-container",
    kitImage: "kit-image",
    scoreContainer: "score-container",
    score: "score",
  };

  private postfixes = {
    time: "time",
    name: "name",
    containerRight: "container-right",
    containerLeft: "container-left",
    leave: "leave",
  };

  private elements = {
    goalText: ElementsFactory.createElement({
      className: this.classNames.goal,
      elementType: "h2",
    }),
    containerLeft: ElementsFactory.createElement({
      className: `${this.classNames.firstSceneContainer} ${this.postfixes.containerLeft}`,
      elementType: "div",
    }),
    containerRight: ElementsFactory.createElement({
      className: `${this.classNames.firstSceneContainer} ${this.postfixes.containerRight}`,
      elementType: "div",
    }),
    kitContainer: ElementsFactory.createElement({
      className: this.classNames.kitContainer,
      elementType: "div",
    }),
    kitImage: ElementsFactory.createElement({
      className: this.classNames.kitImage,
      elementType: "img",
    }) as HTMLImageElement,
    scoreContainer: ElementsFactory.createElement({
      className: this.classNames.scoreContainer,
      elementType: "div",
    }),
    scoreTime: ElementsFactory.createElement({
      className: `${this.classNames.score} ${this.postfixes.time}`,
      elementType: "p",
    }),
    scoreName: ElementsFactory.createElement({
      className: `${this.classNames.score} ${this.postfixes.name}`,
      elementType: "p",
    }),
  };

  act(cb?: () => void) {
    const {
      kitImage,
      scoreName,
      scoreTime,
      goalText,
      containerLeft,
      containerRight,
      kitContainer,
      scoreContainer,
    } = this.elements;

    kitImage.src = "./assets/bayern-kit.svg";
    scoreName.innerText = "Lewandowski";
    scoreTime.innerText = "73'";
    goalText.innerText = "Goal!";

    kitContainer.appendChild(kitImage);
    containerLeft.appendChild(kitContainer);

    scoreContainer.appendChild(scoreTime);
    scoreContainer.appendChild(scoreName);
    containerRight.appendChild(scoreContainer);

    this.sceneContainer.appendChild(goalText);
    this.sceneContainer.appendChild(containerLeft);
    this.sceneContainer.appendChild(containerRight);

    const DISAPPEAR_ANIMATION_TIMEOUT_MS = 2000;

    kitContainer.onanimationend = () => {
      setTimeout(() => {
        this.removeElements(cb);
      }, DISAPPEAR_ANIMATION_TIMEOUT_MS);
    };
  }

  private removeElements(cb?: () => void) {
    const {
      goalText,
      kitContainer,
      scoreContainer,
      containerLeft,
      containerRight,
    } = this.elements;

    goalText.className = `${this.classNames.goal} ${this.postfixes.leave}`;
    kitContainer.className = `${this.classNames.kitContainer} ${this.postfixes.leave}`;
    scoreContainer.className = `${this.classNames.scoreContainer} ${this.postfixes.leave}`;

    scoreContainer.onanimationend = () => {
      this.sceneContainer.removeChild(goalText);
      this.sceneContainer.removeChild(containerLeft);
      this.sceneContainer.removeChild(containerRight);
      if (cb) cb();
    };
  }
}
