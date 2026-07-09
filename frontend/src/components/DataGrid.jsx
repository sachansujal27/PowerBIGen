import { useEffect, useMemo, useState, useRef } from "react";
import { DataGrid } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { listRecords, exportExcelUrl, importExcel, updateRecord } from "../api";

export default function DataGridPanel({ refreshKey, headers = [] }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [importMsg, setImportMsg] = useState("");
  const [saveMsg, setSaveMsg] = useState("");
  const fileInputRef = useRef(null);
  const columns = useMemo(() => {
    // Collect every unique column from every row
    const keySet = new Set();
    rows.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== "id" && key !== "srNo") {
          keySet.add(key);
        }
      });
    });

    // If user supplied headers, use them
    const keys = headers.length > 0 ? headers : [...keySet];

    return [
      {
        key: "srNo",
        name: "ID",
        width: 70,
        frozen: true,
        editable: false,
      },

      ...keys.map((key) => ({
        key,
        name: key,
        editable: true,
        resizable: true,
        width: 180,
      })),
    ];
  }, [headers, rows]);
  const pageSize = 100;

  const fetchPage = async (p = page) => {
    setLoading(true);
    try {
      const { data } = await listRecords();
      const records = data.results || data;

      const flatRows = records.map((record, index) => ({
        id: record.id, // database primary key
        srNo: index + 1, // display serial number
        ...(record.data || {}),
      }));
      setRows(flatRows);
      setCount(data.count ?? (data.results || data).length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const filteredRows = useMemo(() => {
    if (!search) return rows;

    return rows.filter((row) =>
      Object.values(row ?? {}).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [rows, search]);

  const onRowsChange = async (newRows, { indexes }) => {
    setRows(newRows);

    const row = newRows[indexes[0]];

    try {
      const updatedData = { ...row };
      delete updatedData.id;
      delete updatedData.srNo;

      await updateRecord(row.id, {
        data: updatedData,
      });
      setSaveMsg("Saved ✔");

      setTimeout(() => {
        setSaveMsg("");
      }, 1500);
    } catch {
      setSaveMsg("Save failed");
    }
  };

  const handleDelete = (id) => {
    alert("Delete API not implemented yet.");
  };

  const handleDownload = () => {
    window.open(exportExcelUrl(), "_blank");
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportMsg("Importing…");
    try {
      const { data } = await importExcel(file);
      setImportMsg(data.message);
      fetchPage(1);
      setPage(1);
    } catch (err) {
      setImportMsg(err.response?.data?.detail || "Import failed.");
    } finally {
      e.target.value = "";
    }
  };

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  const gridColumns = useMemo(() => {
    return [
      ...columns,

      {
        key: "actions",
        name: "Action",
        width: 100,

        renderCell: ({ row }) => (
          <button
            className="grid-delete-btn"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        ),
      },
    ];
  }, [columns]);

  return (
    <div className="panel">
      <h2>2. View, Edit &amp; Export Data</h2>

      <div className="toolbar">
        <input
          className="search-box"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="count-pill">{count} total records</span>
        <button className="primary download-btn" onClick={handleDownload}>
          ⬇ Download as Excel
        </button>

        <input
          type="file"
          accept=".xlsx"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {saveMsg && <span className="save-indicator">{saveMsg}</span>}
      </div>
      {importMsg && <div className="alert info">{importMsg}</div>}

      <p className="hint">
        Tip: Double-click any cell to edit it. All columns are generated
        dynamically from the uploaded Excel or user-defined headers.
      </p>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div
          className="grid-container"
          style={{
            height: "100%",
            width: "100%",
            overflow: "auto",
            border: "1px solid #ddd",
          }}
        >
          <DataGrid
            columns={gridColumns}
            rows={filteredRows}
            rowHeight={40}
            headerRowHeight={45}
            rowKeyGetter={(row) => row.id}
            onRowsChange={onRowsChange}
          />
        </div>
      )}

      <div className="pagination">
        <button
          disabled={page <= 1}
          onClick={() => {
            setPage(page - 1);
            fetchPage(page - 1);
          }}
        >
          ◀ Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => {
            setPage(page + 1);
            fetchPage(page + 1);
          }}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
