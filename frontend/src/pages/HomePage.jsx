import { useEffect, useState } from "react";
import { getContents } from "../services/api";
import RoleSelector from "../components/features/Content/RoleSelector";
import ContentTable from "../components/features/Content/ContentTable";
import ContentModal from "../components/features/Content/ContentModal";

export default function HomePage() {
  const [role, setRole] = useState("CREATOR");
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    const res = await getContents(role);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [role]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">
          Content Approval System
        </h1>

        <div className="flex justify-between items-center mb-2"><RoleSelector role={role} setRole={setRole} />

        {role === "CREATOR" && (
          <button
            className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
            onClick={() => {
              setSelected(null);
              setModalOpen(true);
            }}
          >
            + Create Content
          </button>
        )}</div>

        <ContentTable
          data={data}
          role={role}
          refresh={fetchData}
          openModal={(item) => {
            setSelected(item);
            setModalOpen(true);
          }}
        />

        <ContentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          role={role}
          refresh={fetchData}
          selected={selected}
        />
      </div>
    </div>
  );
}