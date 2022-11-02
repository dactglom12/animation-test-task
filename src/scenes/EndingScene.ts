import { Scene } from "../interfaces";
import { HexagonManager } from "../utils/HexagonManager";

enum Colors {
  WHITE = "#fff",
  RED = "#C8102E",
}

export class EndingScene implements Scene {
  private hexagonManager = new HexagonManager(
    document.getElementsByClassName("scene-container")[0] as HTMLElement,
    Colors.WHITE
  );

  act() {
    this.hexagonManager.startAnimation(() => {
      this.hexagonManager.setColor(Colors.RED).startAnimation(() => {
        console.log("Put any further processing here");
      });
    });
  }
}
