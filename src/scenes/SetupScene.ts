import { Scene } from "../interfaces";
import { ElementsFactory } from "../utils/ElementsFactory";

export class SceneSetup implements Scene {
  private classNames = {
    sceneBackground: "scene-background",
    sceneContainer: "scene-container",
    logo: "logo",
  };

  private postfixes = {
    leave: "leave",
  };

  private elements = {
    sceneBackground: ElementsFactory.createElement({
      className: this.classNames.sceneBackground,
      elementType: "div",
    }),
    sceneContainer: ElementsFactory.createElement({
      className: this.classNames.sceneContainer,
      elementType: "div",
    }),
    logo: ElementsFactory.createElement({
      className: this.classNames.logo,
      elementType: "img",
    }) as HTMLImageElement,
  };

  act(finishCallback?: () => void) {
    this.setupScene();

    if (finishCallback) finishCallback();
  }

  private setupScene() {
    const { logo, sceneBackground, sceneContainer } = this.elements;

    logo.src = "./assets/logo.svg";

    sceneContainer.appendChild(logo);
    sceneBackground.appendChild(sceneContainer);
    document.body.appendChild(sceneBackground);
  }

  clearScene() {
    const { logo } = this.elements;

    logo.className = `${this.classNames.logo} ${this.postfixes.leave}`;
  }
}
