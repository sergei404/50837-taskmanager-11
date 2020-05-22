import LoadMoreButtonComponent from "../components/button.js";
import NoTasksComponent from "../components/no-tasks.js";
import SortComponent, {SortType} from "../components/sort.js";
import TaskController from "./task.js";
import TasksComponent from "../components/tasks.js";
import {render, remove, RenderPosition} from "../utils/render.js";


const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// const renderTask = (taskListElement, task) => {
//   const replaceTaskToEdit = () => {
//     replace(taskEditComponent, taskComponent);
//   };

//   const replaceEditToTask = () => {
//     replace(taskComponent, taskEditComponent);
//   };

//   const onEscKeyDown = (evt) => {
//     const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

//     if (isEscKey) {
//       replaceEditToTask();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

//   const taskComponent = new TaskComponent(task);
//   taskComponent.setEditButtonClickHandler(() => {
//     replaceTaskToEdit();
//     document.addEventListener(`keydown`, onEscKeyDown);
//   });

//   const taskEditComponent = new TaskEditComponent(task);
//   taskEditComponent.setSubmitHandler((evt) => {
//     evt.preventDefault();
//     replaceEditToTask();
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   });

//   render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
// };

// const renderTasks = (taskListElement, tasks) => {
// const renderTasks = (taskListElement, tasks, onDataChange) => {
const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  // tasks.forEach((task) => {
  //   renderTask(taskListElement, task);
  // });
  return tasks.map((task) => {
    // const taskController = new TaskController(taskListElement);
    // const taskController = new TaskController(taskListElement, onDataChange);
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);

    taskController.render(task);

    return taskController;
  });
};

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;
    // const renderLoadMoreButton = () => {
    //   if (showingTasksCount >= tasks.length) {
    //     return;
    //   }

    //   render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    //   this._loadMoreButtonComponent.setClickHandler(() => {
    //     const prevTasksCount = showingTasksCount;
    //     showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    //     const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);
    //     renderTasks(taskListElement, sortedTasks);

    //     if (showingTasksCount >= tasks.length) {
    //       remove(this._loadMoreButtonComponent);
    //     }
    //   });
    // };

    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    // let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    // renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
    // renderTasks(taskListElement, tasks.slice(0, this._showingTasksCount));
    // const newTasks = renderTasks(taskListElement, this._tasks.slice(0, this._showingTasksCount));
    // const newTasks = renderTasks(taskListElement, this._tasks.slice(0, this._showingTasksCount), this._onDataChange);
    const newTasks = renderTasks(taskListElement, this._tasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    // renderLoadMoreButton();
    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    // if (showingTasksCount >= tasks.length)
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;
      const taskListElement = this._tasksComponent.getElement();
      this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      // const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);
      // renderTasks(taskListElement, sortedTasks.slice(0, this._showingTasksCount));
      const sortedTasks = getSortedTasks(this._tasks, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksCount);

      // renderTasks(taskListElement, sortedTasks);

      // const newTasks = renderTasks(taskListElement, sortedTasks);
      // const newTasks = renderTasks(taskListElement, sortedTasks, this._onDataChange);
      const newTasks = renderTasks(taskListElement, sortedTasks, this._onDataChange, this._onViewChange);

      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      // if (showingTasksCount >= tasks.length) {
      if (this._showingTasksCount >= this._tasks.length) {
        remove(this._loadMoreButtonComponent);
      }

      // this._sortComponent.setSortTypeChangeHandler((sortType) => {
      //   showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      //   const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

      //   taskListElement.innerHTML = ``;

    //   sortedTasks.slice(0, showingTasksCount)
    //     .forEach((task) => {
    //       renderTask(taskListElement, task);
    //     });
    //   renderTasks(taskListElement, sortedTasks);
    //   // if (showingTasksCount >= tasks.length) {
    //   //   remove(this._loadMoreButtonComponent);
    //   // }
    //   renderLoadMoreButton();
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    // showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    // const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);
    const sortedTasks = getSortedTasks(this._tasks, sortType, 0, this._showingTasksCount);
    const taskListElement = this._tasksComponent.getElement();

    taskListElement.innerHTML = ``;

    // renderTasks(taskListElement, sortedTasks);
    // const newTasks = renderTasks(taskListElement, sortedTasks);
    // const newTasks = renderTasks(taskListElement, sortedTasks, this._onDataChange);
    const newTasks = renderTasks(taskListElement, sortedTasks, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = newTasks;

    // renderLoadMoreButton();
    this._renderLoadMoreButton();
  }
}
