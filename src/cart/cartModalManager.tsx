export interface ModalState {
  updaterFunction: Function;
  isVisible: boolean;
}

export class CartModalManager {
  private updaterFunction!: Function | null;

  public setState(state: ModalState) {
    this.updaterFunction = state.updaterFunction;
  }

  public show() {
    if (!this.updaterFunction) {
      return;
    }
    this.updaterFunction(() => true);
  }

  public hide() {
    if (!this.updaterFunction) {
      return;
    }
    this.updaterFunction(() => false);
  }
}
