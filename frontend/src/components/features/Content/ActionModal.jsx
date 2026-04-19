export default function ActionModal({
  actionType,
  comment,
  setComment,
  onClose,
  onSubmit,
}) {
  if (!actionType) return null;

  const isApprove = actionType === "approve";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">

        <h2 className="text-lg font-semibold mb-4">
          {isApprove ? "Approve Content" : "Reject Content"}
        </h2>

        <textarea
          className="w-full border rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder={
            isApprove
              ? "Add comment (optional)"
              : "Enter reason (required)"
          }
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={`px-4 py-2 text-white rounded ${
              isApprove
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={onSubmit}
          >
            {isApprove ? "Approve" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}