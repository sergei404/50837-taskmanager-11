import {createElement} from "../utils.js";
import {SORTING_NAMES} from "../const.js";

const createSortMarkup = (sortings) => {
  return sortings
    .map((it) => {
      return (
        `<a href="#" class="board__filter"    data-sort-type="${it[`sort-type`]}">${it.title}</a>`
      );
    }).join(`\n`);
};


const createSortTemplate = () => {
  const sortMarkup = createSortMarkup(SORTING_NAMES);

  return (
    `<div class="board__filter-list">
      ${sortMarkup}
    </div>`
  );
};

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
