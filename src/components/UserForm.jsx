import { useMemo, useState } from "react";
import { userFields } from "../config/userFields.config";

function buildEmpty(fields) {
  return fields.reduce((acc, f) => {
    acc[f.name] = "";
    return acc;
  }, {});
}

function buildValuesFromUser(fields, user) {
  const base = buildEmpty(fields);
  if (!user) return base;
  for (const f of fields) base[f.name] = String(user[f.name] ?? "");
  return base;
}

function validate(values, fields) {
  const errors = {};

  for (const f of fields) {
    const v = String(values[f.name] ?? "").trim();

    if (f.required && !v) {
      errors[f.name] = `${f.label} is required`;
      continue;
    }

    if (v && f.minLength && v.length < f.minLength) {
      errors[f.name] = `${f.label} must be at least ${f.minLength} characters`;
      continue;
    }

    if (v && f.type === "email") {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (!ok) errors[f.name] = "Enter a valid email address";
      continue;
    }

    if (v && f.pattern) {
      const re = new RegExp(f.pattern);
      if (!re.test(v)) errors[f.name] = f.helperText || `${f.label} is invalid`;
      continue;
    }
  }

  return errors;
}

export default function UserForm({ initialUser, submitting, onSubmit, onCancelEdit }) {
  const initialValues = useMemo(
    () => buildValuesFromUser(userFields, initialUser),
    [initialUser]
  );

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const isEdit = Boolean(initialUser?.id);

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    const nextErrors = validate(values, userFields);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setFormError("Please fix the highlighted errors.");
      return;
    }

    // payload driven by config (extensible)
    const payload = userFields.reduce((acc, f) => {
      acc[f.name] = String(values[f.name] ?? "").trim();
      return acc;
    }, {});

    console.log("POST payload:", payload);

    await onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{isEdit ? "Edit User" : "Create User"}</h2>
      </div>

      {formError ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {formError}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {userFields.map((f) => (
          <div key={f.name} className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{f.label}</label>
            <input
              className={`w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ${
                errors[f.name]
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              type={f.type}
              value={values[f.name] ?? ""}
              onChange={(e) => handleChange(f.name, e.target.value)}
              required={Boolean(f.required)}
              placeholder={f.label}
            />
            <p className={`text-xs ${errors[f.name] ? "text-red-600" : "text-gray-500"}`}>
              {errors[f.name] || f.helperText || " "}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Saving..." : isEdit ? "Update" : "Create"}
        </button>

        {isEdit ? (
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={submitting}
            className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
