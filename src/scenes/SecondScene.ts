import { Scene } from "../interfaces";
import { ElementsFactory } from "../utils/ElementsFactory";

export class SecondScene implements Scene {
  private sceneContainer =
    document.getElementsByClassName("scene-container")[0];

  private classNames = {
    secondSceneContainer: "second-scene-container",
    secondSceneKitContainer: "second-scene-kit-container",
    kitImage: "kit-image",
    textContainer: "text-container",
    minute: "minute",
    score: "score",
    list: "list",
    listItem: "list-item",
    coefficientContainer: "coefficient-container",
    coefficientText: "coefficient-text",
    coefficientsRow: "coefficients-row",
    coefficientsInner: "coefficients-inner",
    newOddsText: "coefficients-text",
    containersWrapper: "containers-wrapper",
  };

  private postfixes = {
    upper: "upper",
    kitLeft: "kit-left",
    kitRight: "kit-right",
    middle: "middle",
    left: "left",
    right: "right",
    bottom: "bottom",
    disappear: "disappear",
    up: "up",
    down: "down",
    coefficient: "coefficient",
  };

  private elements = {
    containersWrapper: ElementsFactory.createElement({
      className: this.classNames.containersWrapper,
      elementType: "div",
    }),
    containerTopLeft: ElementsFactory.createElement({
      className: `${this.classNames.secondSceneContainer} ${this.postfixes.upper}`,
      elementType: "div",
    }),
    containerTopMiddle: ElementsFactory.createElement({
      className: `${this.classNames.secondSceneContainer} ${this.postfixes.upper} ${this.postfixes.middle}`,
      elementType: "div",
    }),
    containerTopRight: ElementsFactory.createElement({
      className: `${this.classNames.secondSceneContainer} ${this.postfixes.upper}`,
      elementType: "div",
    }),
    containerBottomLeft: ElementsFactory.createElement({
      className: `${this.classNames.secondSceneContainer} ${this.postfixes.bottom}`,
      elementType: "div",
    }),
    containerBottomRight: ElementsFactory.createElement({
      className: `${this.classNames.secondSceneContainer} ${this.postfixes.bottom}`,
      elementType: "div",
    }),
    leftKitContainer: ElementsFactory.createElement({
      className: `${this.classNames.secondSceneKitContainer} ${this.postfixes.kitLeft}`,
      elementType: "div",
    }),
    rightKitContainer: ElementsFactory.createElement({
      className: `${this.classNames.secondSceneKitContainer} ${this.postfixes.kitRight}`,
      elementType: "div",
    }),
    leftKitImage: ElementsFactory.createElement({
      className: this.classNames.kitImage,
      elementType: "img",
    }) as HTMLImageElement,
    rightKitImage: ElementsFactory.createElement({
      className: this.classNames.kitImage,
      elementType: "img",
    }) as HTMLImageElement,
    textContainer: ElementsFactory.createElement({
      className: this.classNames.textContainer,
      elementType: "div",
    }),
    minute: ElementsFactory.createElement({
      className: this.classNames.minute,
      elementType: "span",
    }),
    score: ElementsFactory.createElement({
      className: this.classNames.score,
      elementType: "span",
    }),
    leftList: ElementsFactory.createElement({
      className: `${this.classNames.list} ${this.postfixes.left}`,
      elementType: "ul",
    }),
    rightList: ElementsFactory.createElement({
      className: `${this.classNames.list} ${this.postfixes.right}`,
      elementType: "ul",
    }),
    coefficientsSceneContainer: ElementsFactory.createElement({
      className: `${this.classNames.secondSceneContainer} ${this.postfixes.coefficient}`,
      elementType: "div",
    }),
  };

  act(cb?: () => void) {
    const { leftList } = this.elements;

    this.arrangeElements();

    const LIST_DISAPPEAR_ANIMATION_DELAY_MS = 2000;

    leftList.onanimationend = () => {
      setTimeout(() => {
        this.removeScorerListContainers(() => this.addCoefficientElements(cb));
      }, LIST_DISAPPEAR_ANIMATION_DELAY_MS);
    };
  }

  private arrangeElements() {
    const {
      containerTopLeft,
      containerTopMiddle,
      containerTopRight,
      containerBottomLeft,
      containerBottomRight,
      leftKitContainer,
      leftKitImage,
      rightKitContainer,
      rightKitImage,
      textContainer,
      minute,
      score,
      leftList,
      rightList,
      containersWrapper,
    } = this.elements;

    leftKitImage.src = "./assets/bayern-kit.svg";
    leftKitContainer.appendChild(leftKitImage);
    containerTopLeft.appendChild(leftKitContainer);

    rightKitImage.src = "./assets/bayern-kit.svg";
    rightKitContainer.appendChild(rightKitImage);
    containerTopRight.appendChild(rightKitContainer);

    minute.innerHTML = "&#8226; 73'";
    score.innerText = "3 - 2";

    textContainer.appendChild(minute);
    textContainer.appendChild(score);
    containerTopMiddle.appendChild(textContainer);

    this.generateListItems(3).forEach((item) => {
      leftList.appendChild(item);
    });

    this.generateListItems(2).forEach((item) => {
      rightList.appendChild(item);
    });

    containerBottomLeft.appendChild(leftList);
    containerBottomRight.appendChild(rightList);

    [
      containerTopLeft,
      containerTopMiddle,
      containerTopRight,
      containerBottomLeft,
      containerBottomRight,
    ].forEach((container) => {
      containersWrapper.appendChild(container);
    });

    this.sceneContainer.appendChild(containersWrapper);
  }

  private removeScorerListContainers(cb: () => void) {
    const {
      containerBottomLeft,
      containerBottomRight,
      leftList,
      rightList,
      containersWrapper,
    } = this.elements;

    leftList.className = `${this.classNames.list} ${this.postfixes.left} ${this.postfixes.disappear}`;
    rightList.className = `${this.classNames.list} ${this.postfixes.right} ${this.postfixes.disappear}`;

    leftList.onanimationend = () => {
      containersWrapper.removeChild(containerBottomLeft);
      containersWrapper.removeChild(containerBottomRight);

      cb();
    };
  }

  private addCoefficientElements(cb: () => void) {
    const { coefficientsSceneContainer, containersWrapper } = this.elements;

    const coefTexts = [
      { up: "1", bottom: "1.30" },
      { up: "x", bottom: "1.90" },
      { up: "2", bottom: "3.80" },
    ];

    const coefficientsInnerContainer = ElementsFactory.createElement({
      className: this.classNames.coefficientsInner,
      elementType: "div",
    });

    const coefficientsRow = ElementsFactory.createElement({
      className: this.classNames.coefficientsRow,
      elementType: "div",
    });

    const newOddsText = ElementsFactory.createElement({
      className: this.classNames.newOddsText,
      elementType: "span",
    });

    newOddsText.innerText = "New Odds";

    coefTexts.forEach(({ bottom, up }) => {
      const container = ElementsFactory.createElement({
        className: this.classNames.coefficientContainer,
        elementType: "div",
      });

      const upperText = ElementsFactory.createElement({
        className: `${this.classNames.coefficientText} ${this.postfixes.up}`,
        elementType: "span",
      });
      upperText.innerText = up;

      const bottomText = ElementsFactory.createElement({
        className: `${this.classNames.coefficientText} ${this.postfixes.down}`,
        elementType: "span",
      });
      bottomText.innerText = bottom;

      container.appendChild(upperText);
      container.appendChild(bottomText);
      coefficientsRow.appendChild(container);
    });

    coefficientsInnerContainer.appendChild(coefficientsRow);
    coefficientsInnerContainer.appendChild(newOddsText);
    coefficientsSceneContainer.appendChild(coefficientsInnerContainer);
    containersWrapper.appendChild(coefficientsSceneContainer);

    (coefficientsRow.firstChild as HTMLDivElement).onanimationend = () => {
      const COEFFICIENTS_DISAPPEAR_ANIMATION_DELAY_MS = 2000;

      setTimeout(() => {
        cb();
      }, COEFFICIENTS_DISAPPEAR_ANIMATION_DELAY_MS);
    };
  }

  private generateListItems(length: number = 2) {
    const randomFootbalersLastNames = [
      "24' Lewandowski",
      "23' Pique",
      "17' Reus",
      "56' Marchisio",
      "77' Beckenbauer",
      "89' Haaland",
    ];

    const startIndex = Math.floor(
      Math.random() * (randomFootbalersLastNames.length - length)
    );

    const lastNamesSet = randomFootbalersLastNames.slice(
      startIndex,
      startIndex + length
    );

    return lastNamesSet.map((name) => {
      const listItem = ElementsFactory.createElement({
        className: this.classNames.listItem,
        elementType: "li",
      });

      listItem.innerText = name;

      return listItem;
    });
  }

  clearScene() {
    const { containersWrapper } = this.elements;

    containersWrapper.className = `${this.classNames.containersWrapper} ${this.postfixes.disappear}`;

    containersWrapper.onanimationend = () => {
      // TODO: remove containersWrapper
    };
  }
}
