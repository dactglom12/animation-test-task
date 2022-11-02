import { Scene } from "../interfaces";

export class SceneManager {
  private scene: Scene;

  setScene(s: Scene, cb?: () => void) {
    this.scene = s;
    this.scene.act(cb);
  }
}
