import pandas as pd


class DataProcessor:

    @staticmethod
    def read_file(file):

        filename = file.name.lower()

        if filename.endswith(".csv"):
            df = pd.read_csv(file)

        elif filename.endswith(".xlsx"):
            df = pd.read_excel(file)

        elif filename.endswith(".xls"):
            df = pd.read_excel(file)

        else:
            raise ValueError("Unsupported file format")

        return df

    @staticmethod
    def get_summary(df):

        numeric_columns = df.select_dtypes(
            include=["int64", "float64"]
        ).columns.tolist()

        categorical_columns = df.select_dtypes(
            include=["object"]
        ).columns.tolist()

        return {
            "rows": len(df),
            "columns": len(df.columns),
            "numeric_columns": numeric_columns,
            "categorical_columns": categorical_columns
        }