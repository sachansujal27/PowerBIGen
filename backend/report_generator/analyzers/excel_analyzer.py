import pandas as pd
import numpy as np


class ExcelAnalyzer:
    def __init__(self, file_path):
        self.file_path = file_path

    def read_file(self):
        """
        Read Excel or CSV file
        """

        if self.file_path.lower().endswith(".csv"):
            df = pd.read_csv(self.file_path)
        else:
            df = pd.read_excel(self.file_path)

        return df

    def analyze(self):
        """
        Analyze uploaded dataset
        """

        df = self.read_file()

        report = {}

        # -----------------------------
        # Dataset Information
        # -----------------------------

        report["rows"] = len(df)
        report["columns"] = len(df.columns)
        report["column_names"] = list(df.columns)

        report["missing_values"] = int(df.isnull().sum().sum())
        report["duplicate_rows"] = int(df.duplicated().sum())

        report["memory_usage"] = round(
            df.memory_usage(deep=True).sum() / 1024,
            2,
        )

        # -----------------------------
        # Numeric Columns
        # -----------------------------

        numeric_df = df.select_dtypes(include=np.number)

        report["numeric_columns"] = list(numeric_df.columns)

        report["statistics"] = {}

        for column in numeric_df.columns:

            report["statistics"][column] = {
                "count": float(df[column].count()),
                "mean": round(float(df[column].mean()), 2),
                "median": round(float(df[column].median()), 2),
                "min": round(float(df[column].min()), 2),
                "max": round(float(df[column].max()), 2),
                "sum": round(float(df[column].sum()), 2),
                "std": round(float(df[column].std()), 2),
            }

        # -----------------------------
        # Categorical Columns
        # -----------------------------

        report["categorical_summary"] = {}

        categorical = df.select_dtypes(include="object")

        for column in categorical.columns:

            top_values = (
                df[column]
                .value_counts()
                .head(5)
                .to_dict()
            )

            report["categorical_summary"][column] = top_values

        # -----------------------------
        # KPI Summary
        # -----------------------------
def analyze(self):

    df = self.read_file()

    report = {}

    ...

    # KPI Summary

    report["kpis"] = []

    if "Revenue" in df.columns:
        ...

    # Executive Summary

    report["executive_summary"] = ...
      # -----------------------------
# KPI Summary
# ----------------------------- 

        # -----------------------------
        # KPI Summary
        # -----------------------------

    report["kpis"] = []

        # Revenue
    if "Revenue" in df.columns:
            total_revenue = df["Revenue"].sum()

            report["kpis"].append({
                "title": "Total Revenue",
                "value": f"{total_revenue:,.2f}"
            })

        # Profit
    if "Profit" in df.columns:
            total_profit = df["Profit"].sum()

            report["kpis"].append({
                "title": "Total Profit",
                "value": f"{total_profit:,.2f}"
            })

        # Quantity
    if "Quantity" in df.columns:
            total_quantity = df["Quantity"].sum()

            report["kpis"].append({
                "title": "Items Sold",
                "value": int(total_quantity)
            })

        # Total Records
    report["kpis"].append({
            "title": "Total Records",
            "value": report["rows"]
        })

        # Statistics
    for column in numeric_df.columns:

            report["kpis"].append({
                "metric": column,
                "total": round(df[column].sum(), 2),
                "average": round(df[column].mean(), 2),
                "maximum": round(df[column].max(), 2),
                "minimum": round(df[column].min(), 2),
            })

        # -----------------------------
        # Executive Summary
        # -----------------------------

    report["executive_summary"] = (
            f"The uploaded dataset contains "
            f"{report['rows']} rows and "
            f"{report['columns']} columns. "
            f"The dataset includes "
            f"{len(numeric_df.columns)} numeric fields "
            f"and {len(categorical.columns)} categorical fields."
        )

        # -----------------------------
        # Business Insights
        # -----------------------------

    insights = []

    if "Revenue" in df.columns:

     insights.append(
        f"Total revenue generated is ₹{df['Revenue'].sum():,.2f}."
    )

    if "Profit" in df.columns:

     insights.append(
        f"Overall profit is ₹{df['Profit'].sum():,.2f}."
    )

    if "Region" in report.get("highest_profit_region", {}):

     insights.append(
        f"The highest profit was generated in the {report['highest_profit_region']['region']} region."
    )

    if "Region" in report.get("lowest_profit_region", {}):

     insights.append(
        f"The lowest profit was generated in the {report['lowest_profit_region']['region']} region."
    )
  
    if "top_product" in report:

     insights.append(
        f"{report['top_product']['name']} is the best-selling product."
    )

    report["insights"] = insights

        # -----------------------------
        # Recommendations
        # -----------------------------

    recommendations = []

    if report["missing_values"] > 0:
            recommendations.append(
                "Clean missing values before creating dashboards."
            )

    if report["duplicate_rows"] > 0:
            recommendations.append(
                "Remove duplicate records for better accuracy."
            )

    recommendations.append(
            "Use KPI cards for important metrics."
        )

    recommendations.append(
            "Create trend charts for numeric columns."
        )

    recommendations.append(
            "Create pie charts for categorical columns."
        )

    report["recommendations"] = recommendations

        # -----------------------------
        # Conclusion
        # -----------------------------

    report["conclusion"] = (
            "The uploaded dataset has been successfully analyzed. "
            "The generated report provides useful statistical "
            "information, KPI summaries, and business insights "
            "that can be used to create professional dashboards."
        )

    return report