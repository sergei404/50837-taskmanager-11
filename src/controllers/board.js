import LoadMoreButtonComponent from "../components/button.js";
import NoTasksComponent from "../components/no-tasks.js";
import SortComponent from "../components/sort.js";
import TaskComponent from "../components/task.js";
import TaskEditComponent from "../components/task-edit.js";
import TasksComponent from "../components/tasks.js";
import {render, remove, replace, RenderPosition} from "../utils/render.js";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    // taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
    // replace(taskListElement, taskEditComponent.getElement(), taskComponent.getElement());
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    // taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
    // replace(taskListElement, taskComponent.getElement(), taskEditComponent.getElement());
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  // const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  // editButton.addEventListener(`click`, () => {
  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  // const editForm = taskEditComponent.getElement().querySelector(`form`);
  // editForm.addEventListener(`submit`, (evt) => {
  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

// const renderBoard = (boardComponent, tasks) => {
// const isAllTasksArchived = tasks.every((task) => task.isArchive);

// if (isAllTasksArchived) {
//   render(boardComponent.getElement(), new NoTasksComponent(), RenderPosition.BEFOREEND);
//   return;
// }

// render(boardComponent.getElement(), new SortComponent(), RenderPosition.BEFOREEND);
// render(boardComponent.getElement(), new TasksComponent(), RenderPosition.BEFOREEND);

// const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

// let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
// tasks.slice(0, showingTasksCount)
//   .forEach((task) => {
//     renderTask(taskListElement, task);
//   });

// const loadMoreButtonComponent = new LoadMoreButtonComponent();
// render(boardComponent.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);
// loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
// loadMoreButtonComponent.setClickHandler(() => {
//   const prevTasksCount = showingTasksCount;
//   showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

//   tasks.slice(prevTasksCount, showingTasksCount)
//     .forEach((task) => renderTask(taskListElement, task));

// if (showingTasksCount >= tasks.length) {
// loadMoreButtonComponent.getElement().remove();
// loadMoreButtonComponent.getElement().remove();
// loadMoreButtonComponent.removeElement();
//       remove(loadMoreButtonComponent);
//     }
//   });
// };

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    // renderBoard(this._container, tasks);
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    tasks.slice(0, showingTasksCount)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });

    // const loadMoreButtonComponent = new LoadMoreButtonComponent();
    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    // loadMoreButtonComponent.setClickHandler(() => {
    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount)
        .forEach((task) => renderTask(taskListElement, task));


      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
