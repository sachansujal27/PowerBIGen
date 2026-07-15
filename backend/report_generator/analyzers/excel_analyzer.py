import pandas as pd
import numpy as np


class ExcelAnalyzer:
    """
    Analyze Excel (.xlsx/.xls) and CSV files.
    Returns a dictionary used by BusinessReportGenerator.
    """

    def __init__(self, file_path):
        self.file_path = file_path

    def read_file(self):
        """Read Excel or CSV file"""

        if self.file_path.lower().endswith(".csv"):
            return pd.read_csv(self.file_path)

        return pd.read_excel(self.file_path)

    def analyze(self):

        print("Analyzer Started")

        try:

            df = self.read_file()

            report = {}

            # ---------------------------------------
            # Dataset Information
            # ---------------------------------------

            report["rows"] = int(len(df))
            report["columns"] = int(len(df.columns))
            report["column_names"] = list(df.columns)

            report["missing_values"] = int(df.isnull().sum().sum())
            report["duplicate_rows"] = int(df.duplicated().sum())

            report["memory_usage"] = (
                f"{round(df.memory_usage(deep=True).sum()/1024,2)} KB"
            )

            # ---------------------------------------
            # Numeric Columns
            # ---------------------------------------

            numeric_df = df.select_dtypes(include=np.number)

            report["numeric_columns"] = list(numeric_df.columns)

            report["statistics"] = {}

            for column in numeric_df.columns:

                report["statistics"][column] = {

                    "count": int(df[column].count()),

                    "mean": round(float(df[column].mean()), 2),

                    "median": round(float(df[column].median()), 2),

                    "min": round(float(df[column].min()), 2),

                    "max": round(float(df[column].max()), 2),

                    "sum": round(float(df[column].sum()), 2),

                    "std": (
                        round(float(df[column].std()), 2)
                        if not pd.isna(df[column].std())
                        else 0
                    ),
                }

            # ---------------------------------------
            # Categorical Columns
            # ---------------------------------------

            categorical = df.select_dtypes(include=["object"])

            report["categorical_summary"] = {}

            for column in categorical.columns:

                report["categorical_summary"][column] = (
                    df[column]
                    .astype(str)
                    .value_counts()
                    .head(5)
                    .to_dict()
                )

            # ---------------------------------------
            # KPIs
            # ---------------------------------------

            report["kpis"] = []

            if "Revenue" in df.columns:

                total = float(df["Revenue"].sum())

                report["kpis"].append({

                    "title": "Total Revenue",

                    "value": f"₹{total:,.2f}"
                })

            if "Profit" in df.columns:

                total = float(df["Profit"].sum())

                report["kpis"].append({

                    "title": "Total Profit",

                    "value": f"₹{total:,.2f}"
                })

            if "Quantity" in df.columns:

                total = float(df["Quantity"].sum())

                report["kpis"].append({

                    "title": "Items Sold",

                    "value": int(total)
                })

            report["kpis"].append({

                "title": "Total Records",

                "value": report["rows"]
            })

            # ---------------------------------------
            # Executive Summary
            # ---------------------------------------

            report["executive_summary"] = (

                f"The uploaded dataset contains "

                f"{report['rows']} rows and "

                f"{report['columns']} columns. "

                f"There are "

                f"{report['missing_values']} missing values and "

                f"{report['duplicate_rows']} duplicate rows."
            )

            # ---------------------------------------
            # Insights
            # ---------------------------------------

            insights = []

            if "Revenue" in df.columns:

                insights.append(
                    f"Total Revenue: ₹{df['Revenue'].sum():,.2f}"
                )

            if "Profit" in df.columns:

                insights.append(
                    f"Total Profit: ₹{df['Profit'].sum():,.2f}"
                )

            if "Quantity" in df.columns:

                insights.append(
                    f"Total Quantity Sold: {int(df['Quantity'].sum())}"
                )

            if len(numeric_df.columns) > 0:

                insights.append(
                    f"{len(numeric_df.columns)} numeric columns detected."
                )

            if len(categorical.columns) > 0:

                insights.append(
                    f"{len(categorical.columns)} categorical columns detected."
                )

            report["insights"] = insights

            # ---------------------------------------
            # Recommendations
            # ---------------------------------------

            recommendations = []

            if report["missing_values"] > 0:

                recommendations.append(
                    "Handle missing values before dashboard creation."
                )

            if report["duplicate_rows"] > 0:

                recommendations.append(
                    "Remove duplicate rows."
                )

            recommendations.extend([

                "Monitor KPIs regularly.",

                "Create trend charts.",

                "Use interactive dashboards.",

                "Track business performance monthly.",

                "Use predictive analytics for forecasting."

            ])

            report["recommendations"] = recommendations

            # ---------------------------------------
            # Conclusion
            # ---------------------------------------

            report["conclusion"] = (

                "Dataset analysis completed successfully. "

                "The generated report contains KPI summaries, "

                "statistical analysis, business insights and "

                "recommendations for decision making."
            )

            print("Analyzer Completed Successfully")

            return report

        except Exception as e:

            print("Analyzer Error:", str(e))

            raise