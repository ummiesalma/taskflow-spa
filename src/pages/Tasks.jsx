
import { useEffect, useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("taskflow-tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(event) {
    event.preventDefault();

    const title = taskText.trim();
    if (!title) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: crypto.randomUUID(),
        title,
        completed: false,
      },
    ]);

    setTaskText("");
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <main className="page tasks-page">
      <p className="eyebrow">YOUR WORKSPACE</p>

      <h1>My Tasks</h1>

      <p className="hero-text">
        Small steps lead to big achievements.
      </p>

      <section className="task-stats">
        <div className="stat-card">
          <span>Total tasks</span>
          <strong>{tasks.length}</strong>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <strong>{tasks.length - completedCount}</strong>
        </div>
      </section>

      <form className="add-task-form" onSubmit={addTask}>
        <input
          type="text"
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
          placeholder="What do you need to do?"
          aria-label="New task"
          maxLength={120}
        />

        <button className="primary-button" type="submit">
          + Add Task
        </button>
      </form>

      <div className="filter-buttons" aria-label="Filter tasks">
        {["all", "pending", "completed"].map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? "filter active" : "filter"}
            onClick={() => setFilter(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      <section className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty-state">
            No tasks here yet. Add your first task!
          </p>
        ) : (
          filteredTasks.map((task) => (
            <article className="task-item" key={task.id}>
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />

                <span className={task.completed ? "task-done" : ""}>
                  {task.title}
                </span>
              </label>

              <button
                type="button"
                className="delete-button"
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete ${task.title}`}
              >
                Delete
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
