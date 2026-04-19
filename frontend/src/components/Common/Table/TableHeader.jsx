export default function TableHeader({ columns }) {
  return (
    <thead className="bg-gray-50 border-b">
      <tr className="text-gray-500 text-sm">
        {columns.map((col, index) => (
          <th
            key={index}
            className={`px-6 py-4 font-medium ${
              col.align === "right" ? "text-right" : "text-left"
            }`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}