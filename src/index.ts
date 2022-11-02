import { SceneManager } from "./scenes/Manager";
import { FirstScene } from "./scenes/FirstScene";
import { SecondScene } from "./scenes/SecondScene";
import { SceneSetup } from "./scenes/SetupScene";
import { EndingScene } from "./scenes/EndingScene";
import "./styles.css";

const FINISHING_DELAY_MS = 750;

const manager = new SceneManager();
const setupScene = new SceneSetup();

manager.setScene(setupScene, () => {
  manager.setScene(new FirstScene(), () => {
    const secondScene = new SecondScene();

    manager.setScene(secondScene, () => {
      setupScene.clearScene();
      secondScene.clearScene();

      setTimeout(() => {
        manager.setScene(new EndingScene());
      }, FINISHING_DELAY_MS);
    });
  });
});
