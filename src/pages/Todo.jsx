import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useTodo } from "../context/todoContext";
import { Link } from "react-router-dom";

export default function Todo() {
    const { user } = useAuth();
    const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodo();
    const [task, setTask] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!task.trim()) return;
        addTodo(crypto.randomUUID(), task.trim());
        setTask("");
    }

    return (
        <div className="grid min-h-[calc(100vh-76px)] place-items-center px-4 py-8">
            <div className="w-full max-w-2xl">
                {!user ? (
                <div className="rounded-[1.5rem] border border-teal-500/15 bg-white/90 px-8 py-12 text-center shadow-[0_18px_46px_rgba(15,118,110,0.08)] backdrop-blur-sm">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg shadow-teal-500/30">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-[-0.03em] bg-gradient-to-r from-teal-400 via-teal-500 to-sky-500 bg-clip-text text-transparent">Tik!t</h1>
                    <p className="mt-2 text-slate-500">Start organizing your tasks today</p>
                    <Link to="/auth" className="mt-6 inline-block rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-500/30 transition-all hover:from-teal-600 hover:to-teal-700">
                        Get Started
                    </Link>
                </div>
            ):(
                <>
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-[-0.03em] text-teal-800">Your Tasks</h1>
                        <p className="mt-1 text-sm text-slate-400">
                            {todos.length === 0 ? "No tasks yet" : `${todos.filter(t => t.completed).length} of ${todos.length} completed`}
                        </p>
                    </div>
                    {todos.length > 0 && (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-sm font-bold text-teal-700">
                            {Math.round((todos.filter(t => t.completed).length / todos.length) * 100)}%
                        </div>
                    )}
                </div>

                {/* Add task form */}
                <form className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-2" onSubmit={handleSubmit}>
                    <div className="flex flex-1 flex-col gap-1.5">
                        <label htmlFor="task" className="text-sm font-semibold text-teal-800">Add Task</label>
                        <input
                            type="text"
                            id="task"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 transition-all placeholder:text-slate-300 focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                            placeholder="What needs to be done?"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-500/30 transition-all hover:from-teal-600 hover:to-teal-700 sm:py-3">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add
                    </button>
                </form>

                {/* Task list */}
                <div>
                    {todos.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-teal-200 bg-teal-50/30 px-8 py-12 text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-500">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <p className="text-teal-700/60">No tasks yet. Add one above to get started.</p>
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-2">
                            {todos.map(todo => (
                                <li
                                    key={todo.id}
                                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
                                >
                                    {editingId === todo.id ? (
                                        <div className="flex flex-1 items-center gap-2">
                                            <input
                                                type="text"
                                                className="flex-1 rounded-lg border border-teal-300 bg-teal-50/30 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400/30"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                autoFocus
                                            />
                                            <button
                                                className="flex items-center gap-1 rounded-lg bg-teal-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
                                                onClick={() => {
                                                    if (editText.trim()) {
                                                        editTodo(todo.id, editText.trim());
                                                    }
                                                    setEditingId(null);
                                                }}
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                                Save
                                            </button>
                                            <button
                                                className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200"
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all ${todo.completed ? "border-teal-500 bg-teal-500 text-white" : "border-slate-300 hover:border-teal-400"}`}
                                                    onClick={() => toggleTodo(todo.id)}
                                                >
                                                    {todo.completed && (
                                                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </button>
                                                <span
                                                    className={`cursor-pointer transition-colors ${todo.completed ? "text-slate-300 line-through" : "text-slate-700"}`}
                                                    onClick={() => toggleTodo(todo.id)}
                                                >
                                                    {todo.task}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-teal-600 transition-colors hover:bg-teal-50"
                                                    onClick={() => {
                                                        setEditingId(todo.id);
                                                        setEditText(todo.task);
                                                    }}
                                                    aria-label="Edit"
                                                >
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50"
                                                    onClick={() => deleteTodo(todo.id)}
                                                    aria-label="Delete"
                                                >
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                </>
            )}

            </div>
        </div>
    );
}