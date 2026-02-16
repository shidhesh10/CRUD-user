import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import ConfirmDialog from "./components/ConfirmDialog";
import { fetchUsers, createUser, updateUser, deleteUser } from "./services/user.service";
import { getErrorMessage } from "./services/api.service";

export default function App() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [newFormVersion, setNewFormVersion] = useState(0);

  const [deleteTarget, setDeleteTarget] = useState(null);

  async function loadUsers() {
    setError("");
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (!success) return;

    const t = setTimeout(() => setSuccess(""), 3000);
    return () => clearTimeout(t);
  }, [success]);

  async function handleSubmit(payload) {
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      if (selected?.id) {
        const updated = await updateUser(selected.id, payload);
        setUsers((prev) => prev.map((u) => (u.id === selected.id ? updated : u)));
        setSelected(null);
        setSuccess("User updated successfully.");
      } else {
        const created = await createUser(payload);
        setUsers((prev) => [created, ...prev]);
        setSuccess("User created successfully.");
        setNewFormVersion((v) => v + 1); // clears form
      }
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setSubmitting(false);
    }
  }

  function requestDelete(user) {
    setDeleteTarget(user);
  }

  async function confirmDelete() {
    if (!deleteTarget?.id) return;

    setError("");
    setSuccess("");

    try {
      await deleteUser(deleteTarget.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      if (selected?.id === deleteTarget.id) setSelected(null);
      setSuccess("User deleted.");
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">User Management (CRUD)</h1>

        {error ? (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {success}
          </div>
        ) : null}

        <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
          <UserForm
            key={selected?.id ?? `new-${newFormVersion}`}
            initialUser={selected}
            submitting={submitting}
            onSubmit={handleSubmit}
            onCancelEdit={() => setSelected(null)}
          />
        </div>

        <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Users</h2>
            {loading ? <span className="text-sm text-gray-500">Loading...</span> : null}
          </div>

          {!loading ? (
            <UserList users={users} onEdit={setSelected} onDelete={requestDelete} />
          ) : (
            <p className="text-sm text-gray-600">Loading…</p>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Confirm delete"
        description={`Are you sure you want to delete ${deleteTarget?.firstName ?? ""} ${
          deleteTarget?.lastName ?? ""
        }?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
