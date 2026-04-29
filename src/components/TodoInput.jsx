import { useState } from "react";
import { Plus } from "lucide-react";

const TodoInput = ({ addTodo }) => {
  const [todo, setTodo] = useState("");

  const handleAdd = () => {
    const trimmed = todo.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setTodo("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex gap-2.5">
      <div className="relative flex-1 group">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="w-full pl-5 pr-4 py-3 rounded-2xl 
          bg-slate-50/50 border border-slate-100
          focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 
          focus:border-emerald-400 placeholder:text-slate-400 
          transition-all duration-300 text-slate-700 text-[15px] font-medium"
        />
        <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none opacity-50"></div>
      </div>

      <button
        onClick={handleAdd}
        className="flex items-center justify-center gap-1.5 px-6 py-3 
        rounded-2xl bg-emerald-500 hover:bg-emerald-600 
        text-white font-bold shadow-[0_8px_20px_-6px_rgba(16,185,129,0.3)]
        hover:shadow-[0_12px_25px_-5px_rgba(16,185,129,0.4)]
        active:scale-95 transition-all duration-200"
      >
        <Plus size={20} strokeWidth={3} />
        <span className="hidden sm:inline">Add</span>
      </button>
    </div>
  );
};

export default TodoInput;
