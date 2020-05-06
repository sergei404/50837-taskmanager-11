import BoardComponent from "./components/board.js";
import FilterComponent from "./components/filter.js";
import BoardController from "./controllers/board.js";
import SiteMenuComponent from "./components/site-menu.js";
// import LoadMoreButtonComponent from "./components/button.js";
// import TaskEditComponent from "./components/task-edit.js";
// import TaskComponent from "./components/task.js";
// import TasksComponent from "./components/tasks.js";
// import NoTasksComponent from "./components/no-tasks.js";
// import SortComponent from "./components/sort.js";

import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from "./utils/render.js";

const TASK_COUNT = 22;

const siteMainElem = document.querySelector(`.main`);
const siteHeaderElem = siteMainElem.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElem, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMainElem, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);
render(siteMainElem, boardComponent, RenderPosition.BEFOREEND);
// renderBoard(boardComponent, tasks);
boardController.render(tasks);
