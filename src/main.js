import {createMenuTemplate} from './components/menu-tenplate.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board-template.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createTaskTemplate} from './components/task.js';
import {createButtonTemplate} from './components/button.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElem = document.querySelector(`.main`);
const siteHeaderElem = siteMainElem.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElem, createMenuTemplate());
render(siteMainElem, createFilterTemplate(filters));
render(siteMainElem, createBoardTemplate());

const boardElem = siteMainElem.querySelector(`.board`);
const taskListElem = siteMainElem.querySelector(`.board__tasks`);

render(taskListElem, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount)
  .forEach((task) => render(taskListElem, createTaskTemplate(task)));

render(boardElem, createButtonTemplate());

const loadMoreButton = boardElem.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElem, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});

