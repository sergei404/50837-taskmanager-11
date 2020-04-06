import {createMenuTemplate} from './components/menu-tenplate.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board-template.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createTaskTemplate} from './components/task.js';
import {createButtonTemplate} from './components/button.js';

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElem = document.querySelector(`.main`);
const siteHeaderElem = siteMainElem.querySelector(`.main__control`);

render(siteHeaderElem, createMenuTemplate());
render(siteMainElem, createFilterTemplate());
render(siteMainElem, createBoardTemplate());

const taskListElem = siteMainElem.querySelector(`.board__tasks`);
render(taskListElem, createTaskEditTemplate());
new Array(TASK_COUNT)
  .fill(` `)
  .forEach(() => render(taskListElem, createTaskTemplate()));

const boardElem = siteMainElem.querySelector(`.board`);
render(boardElem, createButtonTemplate());

