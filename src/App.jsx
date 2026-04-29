import { useEffect, useState } from "react";
import { ClipboardList, CheckCircle2 } from "lucide-react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const App = () => {
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(list));
  }, [list]);

  const addTodo = (text) => {
    const newTodo = {
      text,
      completed: false,
    };
    setList([...list, newTodo]);
  };

  const deleteTodo = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const editTodo = (index, newText) => {
    setList(
      list.map((item, i) => (i === index ? { ...item, text: newText } : item)),
    );
  };

  const toggleComplete = (index) => {
    setList(
      list.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const doneCount = list.filter((item) => item.completed).length;
  const totalCount = list.length;

  return (
    <div className="h-screen w-full flex items-center justify-center p-4 bg-[#f8fafc] overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-[12%] left-[12%] text-4xl opacity-20 rotate-[-12deg]">
          🍃
        </div>
        <div className="absolute top-[18%] right-[15%] text-5xl opacity-15 rotate-[15deg]">
          🖋️
        </div>
        <div className="absolute bottom-[20%] left-[8%] text-6xl opacity-10 rotate-[5deg]">
          🌊
        </div>
        <div className="absolute bottom-[12%] right-[10%] text-5xl opacity-20 rotate-[-10deg]">
          ☁️
        </div>
        <div className="absolute top-[45%] left-[5%] text-3xl opacity-10">
          ✨
        </div>
        <div className="absolute top-[60%] right-[5%] text-4xl opacity-10">
          🌱
        </div>

        <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-3xl shadow-[0_32px_64px_-15px_rgba(15,23,42,0.1)] rounded-[2.5rem] border border-white/60 p-8 flex flex-col max-h-[85vh]">
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-2xl shadow-inner border border-emerald-100/50">
              <ClipboardList className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
              My Tasks
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            <span>
              {doneCount} / {totalCount}
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        <div className="shrink-0 mb-4">
          <TodoInput addTodo={addTodo} />
        </div>

        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          {list.length > 0 ? (
            <div className="pb-4">
              <TodoList
                list={list}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleComplete={toggleComplete}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 opacity-30">
              <div className="bg-slate-100 p-5 rounded-full mb-3">
                <ClipboardList
                  className="w-10 h-10 text-slate-400"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-slate-500 font-medium text-sm tracking-wide text-center">
                No tasks yet. <br /> Add one above!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
