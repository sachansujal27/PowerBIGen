import pdfplumber
import fitz  # PyMuPDF


class PDFAnalyzer:
    def __init__(self, file_path):
        self.file_path = file_path

    def extract_text(self):
        """
        Extract text using pdfplumber
        """
        text = ""

        with pdfplumber.open(self.file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

        return text

    def analyze(self):
        """
        Analyze uploaded PDF
        """

        doc = fitz.open(self.file_path)

        page_count = len(doc)

        metadata = doc.metadata

        text = self.extract_text()

        words = text.split()

        lines = text.split("\n")

        tables_found = 0

        try:
            with pdfplumber.open(self.file_path) as pdf:
                for page in pdf.pages:
                    tables = page.extract_tables()
                    tables_found += len(tables)
        except Exception:
            tables_found = 0

        report = {
            "file_type": "PDF",
            "pages": page_count,
            "word_count": len(words),
            "line_count": len(lines),
            "character_count": len(text),
            "tables_detected": tables_found,
            "title": metadata.get("title", ""),
            "author": metadata.get("author", ""),
            "subject": metadata.get("subject", ""),
            "creator": metadata.get("creator", ""),
        }

        # -------------------------
        # Executive Summary
        # -------------------------

        report["executive_summary"] = (
            f"The uploaded PDF contains {page_count} pages "
            f"with approximately {len(words)} words. "
            f"{tables_found} table(s) were detected during analysis."
        )

        # -------------------------
        # Insights
        # -------------------------

        insights = []

        insights.append(f"Total Pages: {page_count}")
        insights.append(f"Total Words: {len(words)}")
        insights.append(f"Total Lines: {len(lines)}")
        insights.append(f"Tables Detected: {tables_found}")

        if metadata.get("author"):
            insights.append(f"Author: {metadata['author']}")

        if metadata.get("title"):
            insights.append(f"Title: {metadata['title']}")

        report["insights"] = insights

        # -------------------------
        # Recommendations
        # -------------------------

        recommendations = []

        if tables_found > 0:
            recommendations.append(
                "Extract detected tables into Excel for further analysis."
            )

        recommendations.append(
            "Review extracted text for data quality."
        )

        recommendations.append(
            "Generate charts from extracted numerical information."
        )

        recommendations.append(
            "Store the report for future comparison."
        )

        report["recommendations"] = recommendations

        # -------------------------
        # Conclusion
        # -------------------------

        report["conclusion"] = (
            "The uploaded PDF was successfully analyzed. "
            "The extracted content, metadata, and detected tables "
            "can be used to generate business reports and dashboards."
        )

        return report