import { useState } from "react";
import { Pencil, Trash2, Save, Check } from "lucide-react";

const TodoList = ({ list, deleteTodo, editTodo, toggleComplete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (index, text) => {
    setEditIndex(index);
    setEditText(text);
  };

  const saveEdit = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    editTodo(editIndex, trimmed);
    setEditIndex(null);
    setEditText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }
  };

  return (
    <ul className="space-y-3.5">
      {list.map((item, index) => (
        <li
          key={index}
          className={`flex justify-between items-center px-4 py-3.5 rounded-2xl border transition-all duration-300 ${
            item.completed
              ? "bg-slate-50/50 border-slate-100 opacity-80"
              : "bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100"
          }`}
        >
          {editIndex === index ? (
            <div className="flex flex-1 items-center gap-2">
              <input
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-3 py-1.5 rounded-xl border-2 border-emerald-100 focus:outline-none focus:border-emerald-400 bg-white text-slate-700 text-[15px] font-medium"
              />
              <button
                onClick={saveEdit}
                className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100"
              >
                <Save size={18} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 flex-1">
                <button
                  onClick={() => toggleComplete(index)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                    item.completed
                      ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-100"
                      : "border-slate-200 hover:border-emerald-400"
                  }`}
                >
                  {item.completed && (
                    <Check size={14} className="text-white" strokeWidth={4} />
                  )}
                </button>

                <span
                  className={`text-[15px] font-medium transition-all duration-300 ${
                    item.completed
                      ? "text-slate-400 line-through decoration-2 decoration-slate-300"
                      : "text-slate-700"
                  }`}
                >
                  {item.text}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => startEdit(index, item.text)}
                  className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => deleteTodo(index)}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
