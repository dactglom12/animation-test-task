export interface Scene {
  act: (finishCallback?: () => void) => void;
}
