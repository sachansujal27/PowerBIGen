// frontend/src/services/reportApi.js

const API_BASE = "http://127.0.0.1:8000/api/report";

/**
 * Upload an Excel, CSV, or PDF file to the backend
 * and receive the generated report.
 */
export async function generateReport(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE}/upload/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = "Failed to generate report.";

      try {
        const error = await response.json();
        errorMessage =
          error.message ||
          error.error ||
          "Something went wrong while generating the report.";
      } catch (e) {
        // Ignore JSON parsing errors
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Generate Report Error:", error);
    throw error;
  }
}

/**
 * Fetch report preview
 */
export async function getReportPreview() {
  try {
    const response = await fetch(`${API_BASE}/preview/`);

    if (!response.ok) {
      throw new Error("Unable to fetch report preview.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Download PDF report
 */
export function downloadPDF() {
  window.open(`${API_BASE}/pdf/`, "_blank");
}

/**
 * Download DOCX report
 */
export function downloadDOCX() {
  window.open(`${API_BASE}/docx/`, "_blank");
}

/**
 * Email report
 */
export async function emailReport(email) {
  try {
    const response = await fetch(`${API_BASE}/email/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Unable to send email.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Print Report
 */
export function printReport() {
  window.print();
}

/**
 * Get report history
 */
export async function getReportHistory() {
  try {
    const response = await fetch(`${API_BASE}/history/`);

    if (!response.ok) {
      throw new Error("Unable to fetch report history.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Delete report
 */
export async function deleteReport(reportId) {
  try {
    const response = await fetch(`${API_BASE}/history/${reportId}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Unable to delete report.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * API URLs
 */
export const API = {
  upload: `${API_BASE}/upload/`,
  preview: `${API_BASE}/preview/`,
  pdf: `${API_BASE}/pdf/`,
  docx: `${API_BASE}/docx/`,
  email: `${API_BASE}/email/`,
  history: `${API_BASE}/history/`,
};
