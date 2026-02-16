import { userFields } from "../config/userFields.config";

export default function UserList({ users, onEdit, onDelete }) {
  if (!users.length) {
    return <p className="text-sm text-gray-600">No users yet. Create one from the form.</p>;
  }

  const columns = userFields.map((f) => ({ key: f.name, label: f.label }));

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2 text-left text-sm font-semibold text-gray-700">
                {c.label}
              </th>
            ))}
            <th className="px-3 py-2 text-right text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={String(u.id ?? u.email ?? "")} className="border-b last:border-b-0">
              {columns.map((c) => (
                <td key={c.key} className="px-3 py-2 text-sm text-gray-800">
                  {String(u[c.key] ?? "")}
                </td>
              ))}

              <td className="px-3 py-2 text-right">
                <button
                  onClick={() => onEdit(u)}
                  className="mr-2 rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(u)}
                  className="rounded-md border border-red-300 bg-red-50 px-3 py-1 text-sm text-red-700 hover:bg-red-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
