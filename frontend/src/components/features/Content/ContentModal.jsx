import { useState, useEffect } from "react";
import { createContent, editContent } from "../../../services/api";

export default function ContentModal({
  isOpen,
  onClose,
  role,
  refresh,
  selected,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setDescription(selected.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [selected]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    await createContent({ title, description }, role)
    onClose();
    refresh();
  };

  const handleUpdate = async (id) => {
    await editContent(id, {title, description}, role)
    onClose();
    refresh();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h2 className="text-lg font-bold mb-4">
          {selected ? "Edit Content" : "Create Content"}
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-3 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={()=> selected ? handleUpdate(selected.id) : handleSubmit()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}