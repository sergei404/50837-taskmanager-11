import AbstractComponent from "./abstract-component.js";
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

export default class Sort extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }
}
