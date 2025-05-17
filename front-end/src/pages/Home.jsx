import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  async function addTodo() {
    const todo = {
      title: todoInput
    };

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in, Login/Signup first to contiue");
      navigate("/login");
    }

    const options = {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(
      "https://simple-todo-backend-ten.vercel.app/todos",
      options
    );

    const data = await res.json();

    console.log(data);

    getTodos();
  }

  async function getTodos() {
    // token
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in, Login/Signup first to contiue");
      navigate("/login");
    }

    try {
      const res = await fetch(
        "https://simple-todo-backend-ten.vercel.app/todos",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setTodos(data); // []
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="pt-16 px-20">
     
      <div className="flex justify-center gap-4 py-4">
        <input
          type="text"
          placeholder="Enter todo"
          className="border p-2"
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput}
        />
        <button
          onClick={addTodo}
          className="border rounded-lg px-4 py-2 bg-green-500 cursor-pointer"
        >
          Add todo
        </button>
      </div>
      <div className="pt-8">
        <h2 className="text-center text-3xl text-gray-800">All todos</h2>
        <div className="grid grid-cols-3 gap-6 py-8">
          {todos.map((todo) => {
            return (
              <div className="border border-slate-600 p-6 rounded-2xl">
                <p className="text-2xl text-black">{todo.title}</p>
                <p className="text-sm text-neutral-400">
                  {todo.completed ? "Completed" : "Not completed"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
