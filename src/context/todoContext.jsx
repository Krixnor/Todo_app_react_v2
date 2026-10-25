import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

const TodoContext = createContext(null);

function getTodos(userId) {
    if (!userId) return [];
    const savedTodos = localStorage.getItem(`todos_${userId}`);
    return savedTodos ? JSON.parse(savedTodos) : [];
}

export default function TodoProvider({ children }) {
    const { user } = useAuth();
    const userId = user?.id;

    const [todos, setTodos] = useState(() => getTodos(userId));

    // Reload todos when the logged-in user changes
    useEffect(() => {
        setTodos(getTodos(userId));
    }, [userId]);

    // Persist todos to this user's localStorage key
    useEffect(() => {
        if (userId) {
            localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
        }
    }, [todos, userId]);

    function addTodo(id, task) {
        setTodos(prevTodos => [{ id, task, completed: false }, ...prevTodos]);
    }

    function toggleTodo(id) {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    function deleteTodo(id) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }

    function editTodo(id, newTask) {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, task: newTask } : todo
            )
        );
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, editTodo }}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodo() {
    const context = useContext(TodoContext);
    if (!context) throw new Error('useTodo must be used within a TodoProvider');
    return context;
}