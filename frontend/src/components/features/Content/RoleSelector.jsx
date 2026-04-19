export default function RoleSelector({ role, setRole }) {
  return (
    <div className="flex gap-6 mb-6">
      {["CREATOR", "REVIEWER_1", "REVIEWER_2"].map((r) => (
        <label key={r} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value={r}
            checked={role === r}
            onChange={(e) => setRole(e.target.value)}
            className="accent-blue-600"
          />
          <span className="font-medium text-gray-700">{r}</span>
        </label>
      ))}
    </div>
  );
}