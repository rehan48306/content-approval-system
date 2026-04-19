import TableRow from "./TableRow";

export default function TableBody({
  data,
  role,
  openModal,
  refresh,
  ...props
}) {
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="4" className="text-center py-10 text-gray-400">
            No content available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((item) => (
        <TableRow
          key={item.id}
          item={item}
          role={role}
          openModal={openModal}
          refresh={refresh}
          {...props}
        />
      ))}
    </tbody>
  );
}