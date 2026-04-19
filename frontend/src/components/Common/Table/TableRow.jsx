import { submitContent } from "../../../services/api";
import { StatusBadge } from "../StatusBadge";

export default function TableRow({
  item,
  role,
  openModal,
  refresh,
  setActionType,
  setSelectedId,
  setHistoryOpen,
  setHistoryData,
  setLoadingHistory,
  getApprovals,
}) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-6 py-4 font-medium text-gray-800">
        {item.title}
      </td>

      <td className="px-6 py-4 text-gray-600">
        {item.description}
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={item.status} />
      </td>

      <td className="px-6 py-4 text-right space-x-3">

        {/* CREATOR */}
        {role === "CREATOR" && item.status === "DRAFT" && (
          <>
            <button
              className="text-blue-600 hover:text-blue-800 font-medium"
              onClick={() => openModal(item)}
            >
              Edit
            </button>

            <button
              className="text-yellow-600 hover:text-yellow-800 font-medium"
              onClick={async () => {
                await submitContent(item.id, role);
                refresh();
              }}
            >
              Submit
            </button>
          </>
        )}

        {/* REVIEWER */}
        {(role === "REVIEWER_1" && item.status === "REVIEW_1") ||
        (role === "REVIEWER_2" && item.status === "REVIEW_2") ? (
          <>
            <button
              className="text-green-600 hover:text-green-800 font-medium"
              onClick={() => {
                setActionType("approve");
                setSelectedId(item.id);
              }}
            >
              Approve
            </button>

            <button
              className="text-red-600 hover:text-red-800 font-medium"
              onClick={() => {
                setActionType("reject");
                setSelectedId(item.id);
              }}
            >
              Reject
            </button>
          </>
        ) : null}

         {/* HISTORY */}
        <button
          className="text-gray-600 hover:text-gray-900 font-medium"
          onClick={async () => {
            setLoadingHistory(true);
            setHistoryOpen(true);

            const res = await getApprovals(item.id);
            setHistoryData(res.data);

            setLoadingHistory(false);
          }}
        >
          History
        </button>
      </td>
    </tr>
  );
}