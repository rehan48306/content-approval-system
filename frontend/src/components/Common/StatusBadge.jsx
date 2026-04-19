export function StatusBadge({ status }) {
    const styles = {
        DRAFT: "bg-gray-200 text-gray-600",
        REVIEW_1: "bg-yellow-100 text-yellow-700",
        REVIEW_2: "bg-orange-100 text-orange-700",
        APPROVED: "bg-green-100 text-green-700",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
        >
            {status}
        </span>
    );
}