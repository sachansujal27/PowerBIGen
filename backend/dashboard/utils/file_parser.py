"""
Parses CSV, Excel, and PDF files into a pandas DataFrame.
Uses pandas type detection compatible with Pandas 2.x.
"""

import pandas as pd
import numpy as np
import pdfplumber

from pandas.api.types import (
    is_numeric_dtype,
    is_datetime64_any_dtype,
    is_string_dtype,
)


def parse_file(file_obj, file_type: str) -> pd.DataFrame:
    """
    Accept a Django InMemoryUploadedFile and return a clean DataFrame.
    Supported types: csv, excel, pdf
    """
    if file_type == "csv":
        df = _parse_csv(file_obj)

    elif file_type == "excel":
        df = _parse_excel(file_obj)

    elif file_type == "pdf":
        df = _parse_pdf(file_obj)

    else:
        raise ValueError(f"Unsupported file type: {file_type}")

    return _clean_dataframe(df)


def _parse_csv(file_obj) -> pd.DataFrame:
    """Try multiple encodings to read CSV robustly."""
    for enc in ("utf-8", "latin-1", "cp1252"):
        try:
            file_obj.seek(0)
            return pd.read_csv(file_obj, encoding=enc)
        except UnicodeDecodeError:
            continue

    raise ValueError("Could not decode CSV file.")


def _parse_excel(file_obj) -> pd.DataFrame:
    """Read first sheet from Excel."""
    return pd.read_excel(file_obj, engine="openpyxl")


def _parse_pdf(file_obj) -> pd.DataFrame:
    """
    Extract first table found in PDF.
    If no table exists, extract text lines.
    """
    with pdfplumber.open(file_obj) as pdf:

        for page in pdf.pages:
            tables = page.extract_tables()

            if tables:
                rows = tables[0]

                if len(rows) > 1:
                    header = rows[0]
                    data = rows[1:]
                    return pd.DataFrame(data, columns=header)

        text = "\n".join(
            page.extract_text() or ""
            for page in pdf.pages
        )

        lines = [
            line.strip()
            for line in text.splitlines()
            if line.strip()
        ]

        return pd.DataFrame(lines, columns=["text"])


def _clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """
    Clean uploaded data.
    """

    df = df.dropna(how="all")
    df = df.dropna(axis=1, how="all")
    df = df.reset_index(drop=True)

    for col in df.columns:

        if is_string_dtype(df[col]) or df[col].dtype == object:

            df[col] = df[col].astype(str).str.strip()

            converted = pd.to_numeric(
                df[col],
                errors="coerce"
            )

            if (
                converted.notna().sum()
                / max(len(converted), 1)
                > 0.8
            ):
                df[col] = converted

    return df


def dataframe_to_session_data(df: pd.DataFrame) -> dict:
    """
    Serialize DataFrame metadata for DataSession.
    """

    dtype_map = {}

    for col in df.columns:

        if is_numeric_dtype(df[col]):
            dtype_map[col] = "numeric"

        elif is_datetime64_any_dtype(df[col]):
            dtype_map[col] = "datetime"

        else:
            dtype_map[col] = "categorical"

    preview = (
        df.head(10)
        .replace({np.nan: None})
        .to_dict(orient="records")
    )

    return {
        "columns": list(df.columns),
        "dtypes": dtype_map,
        "preview": preview,
        "rows": int(len(df)),
        "cols": int(len(df.columns)),
    }