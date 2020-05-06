import AbstractComponent from "./abstract-component.js";

const createButtonTemplate = () => {
  return (`<button class="load-more" type="button">Load more</button>`);
};

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
