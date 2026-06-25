import numpy as np


class InsightGenerator:

    @staticmethod
    def generate(df):

        numeric_cols = df.select_dtypes(
            include=["int64", "float64"]
        ).columns

        insights = []

        for col in numeric_cols:

            insights.append({
                "column": col,
                "total": float(df[col].sum()),
                "average": float(df[col].mean()),
                "maximum": float(df[col].max()),
                "minimum": float(df[col].min())
            })

        return insights