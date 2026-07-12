from datetime import datetime


class BusinessReportGenerator:
    """
    Converts analyzed Excel/PDF data
    into a professional business report.
    """

    def __init__(self, analysis):
        self.analysis = analysis

    # -------------------------------------------------------
    # Executive Summary
    # -------------------------------------------------------

    def executive_summary(self):

        if "rows" in self.analysis:

            return (
                f"The uploaded dataset contains "
                f"{self.analysis['rows']} rows and "
                f"{self.analysis['columns']} columns. "
                "Automatic statistical analysis has been completed "
                "to identify important business metrics, trends, "
                "and opportunities."
            )

        return self.analysis.get(
            "executive_summary",
            "Business report generated successfully."
        )

    # -------------------------------------------------------
    # Dataset Information
    # -------------------------------------------------------

    def dataset_information(self):

        return {
            "Rows":
                self.analysis.get("rows", "-"),

            "Columns":
                self.analysis.get("columns", "-"),

            "Missing Values":
                self.analysis.get("missing_values", "-"),

            "Duplicate Rows":
                self.analysis.get("duplicate_rows", "-"),

            "Memory Usage":
                self.analysis.get("memory_usage", "-"),
        }

    # -------------------------------------------------------
    # KPI Section
    # -------------------------------------------------------

    def kpi_section(self):

        return self.analysis.get("kpis", [])

    # -------------------------------------------------------
    # Statistics
    # -------------------------------------------------------

    def statistics(self):

        return self.analysis.get(
            "statistics",
            {}
        )

    # -------------------------------------------------------
    # Business Insights
    # -------------------------------------------------------

    def insights(self):

        return self.analysis.get(
            "insights",
            []
        )

    # -------------------------------------------------------
    # Risks
    # -------------------------------------------------------

    def risks(self):

        risks = []

        if self.analysis.get("missing_values", 0) > 0:

            risks.append(
                "Missing values may reduce analytical accuracy."
            )

        if self.analysis.get("duplicate_rows", 0) > 0:

            risks.append(
                "Duplicate records may distort KPI calculations."
            )

        if len(risks) == 0:

            risks.append(
                "No major risks detected from uploaded dataset."
            )

        return risks

    # -------------------------------------------------------
    # Opportunities
    # -------------------------------------------------------

    def opportunities(self):

        opportunities = [

            "Create interactive dashboards.",

            "Monitor KPIs monthly.",

            "Develop forecasting models.",

            "Use predictive analytics.",

            "Improve decision making using data visualization.",
        ]

        return opportunities

    # -------------------------------------------------------
    # Recommendations
    # -------------------------------------------------------

    def recommendations(self):

        return self.analysis.get(
            "recommendations",
            [
                "Continue monitoring business performance."
            ]
        )

    # -------------------------------------------------------
    # Conclusion
    # -------------------------------------------------------

    def conclusion(self):

        return self.analysis.get(
            "conclusion",
            "Business report completed successfully."
        )

    # -------------------------------------------------------
    # Complete Report
    # -------------------------------------------------------

    def generate(self):

        report = {

            "title":
                "Business Analysis Report",

            "generated_date":
                datetime.now().strftime(
                    "%d %B %Y %I:%M %p"
                ),

            "executive_summary":
                self.executive_summary(),

            "dataset_information":
                self.dataset_information(),

            "kpis":
                self.kpi_section(),

            "statistics":
                self.statistics(),

            "insights":
                self.insights(),

            "risks":
                self.risks(),

            "opportunities":
                self.opportunities(),

            "recommendations":
                self.recommendations(),

            "conclusion":
                self.conclusion(),
        }

        return report