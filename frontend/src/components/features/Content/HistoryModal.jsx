export default function HistoryModal({
  open,
  data,
  loading,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto shadow-lg">

        <h2 className="text-lg font-semibold mb-4">
          Approval History
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-400">No history available</p>
        ) : (
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.id} className="border rounded-lg p-3 bg-gray-50">

                <div className="flex justify-between text-sm">
                  <span className="font-medium">
                    {item.reviewer_id}
                  </span>

                  <span
                    className={`font-medium ${
                      item.action === "APPROVED"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.action}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Stage: {item.stage}
                </div>

                {item.comment && (
                  <div className="text-sm mt-2 text-gray-700">
                    💬 {item.comment}
                  </div>
                )}

                <div className="text-xs text-gray-400 mt-1">
                  {item.created_at}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}