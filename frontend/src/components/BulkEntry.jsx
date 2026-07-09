import { useState } from "react";
import { bulkCreateRecords } from "../api";

const emptyForm = {};
export default function BulkEntry({ headers = [], onSubmitted }) {
  const [form, setForm] = useState({});
  const [pending, setPending] = useState([]);
  const [csvText, setCsvText] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const MAX = 10000;

  const addSingle = (e) => {
    e.preventDefault();

    setPending((prev) => [...prev, { ...form }]);

    setForm({});
  };
  const addFromCsv = () => {
    const lines = csvText.split("\n").filter(Boolean);

    const rows = [];

    lines.forEach((line) => {
      const values = line.split(",");

      const obj = {};

      headers.forEach((h, i) => {
        obj[h] = values[i]?.trim() || "";
      });

      rows.push(obj);
    });

    setPending((prev) => [...prev, ...rows]);

    setCsvText("");
  };

  const removePending = (idx) =>
    setPending((prev) => prev.filter((_, i) => i !== idx));
  const clearAll = () => setPending([]);

  const submit = async () => {
    setError("");
    setResult(null);
    if (pending.length === 0) {
      setError("Please add at least one record before submitting.");
      return;
    }
    if (pending.length > MAX) {
      setError(
        `You can submit at most ${MAX} records at once (currently ${pending.length}).`,
      );
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await bulkCreateRecords({
        records: pending,
      });
      setResult(data.message);
      setPending([]);
      onSubmitted?.();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          JSON.stringify(err.response?.data) ||
          "Submission failed.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="panel">
      <h2>1. Add Data (1 – 10,000 records)</h2>

      <div className="grid-2col">
        <form className="card" onSubmit={addSingle}>
          <h3>Quick add (one at a time)</h3>
          {headers.map((header) => (
            <input
              key={header}
              placeholder={header}
              value={form[header] || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  [header]: e.target.value,
                })
              }
            />
          ))}
          <button type="submit">Add to list</button>
        </form>

        <div className="card">
          <h3>Bulk paste (CSV)</h3>
          <p className="hint">Format follows the headers entered above.</p>
          <textarea
            rows={8}
            placeholder={
              "John Smith, john@mail.com, 9998887777, 29, Mumbai, MG Road\nAisha Khan, aisha@mail.com, 9123456780, 34, Delhi, Park Street"
            }
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
          />
          <button onClick={addFromCsv}>Add all lines to list</button>
        </div>
      </div>

      <div className="card">
        <div className="row-between">
          <h3>
            Pending records: {pending.length} / {MAX}
          </h3>
          {pending.length > 0 && (
            <button className="secondary" onClick={clearAll}>
              Clear all
            </button>
          )}
        </div>

        {pending.length > 0 && (
          <div className="pending-preview">
            {pending.slice(0, 8).map((r, idx) => (
              <div key={idx} className="pending-row">
                {headers.map((h) => (
                  <span key={h}>{r[h]}</span>
                ))}
                <button onClick={() => removePending(idx)}>✕</button>
              </div>
            ))}
            {pending.length > 8 && (
              <div className="pending-row muted">
                …and {pending.length - 8} more
              </div>
            )}
          </div>
        )}

        {error && <div className="alert error">{error}</div>}
        {result && <div className="alert success">{result}</div>}

        <button
          className="primary full-width-btn"
          disabled={submitting || pending.length === 0}
          onClick={submit}
        >
          {submitting
            ? "Submitting..."
            : `Submit ${pending.length} ${
                pending.length === 1 ? "record" : "records"
              } to server`}
        </button>
      </div>
    </div>
  );
}
