type CreateElementConfig = {
  elementType: keyof HTMLElementTagNameMap;
  className: string;
};

export class ElementsFactory {
  static createElement(config: CreateElementConfig) {
    const el = document.createElement(config.elementType);
    el.className = config.className;
    return el;
  }
}
