from datetime import datetime


class BusinessReportGenerator:
    """
    Converts analyzed Excel/PDF data into
    a professional business report.
    """

    def __init__(self, analysis):
        self.analysis = analysis

    # -------------------------------------------------------
    # Executive Summary
    # -------------------------------------------------------

    def executive_summary(self):

        rows = self.analysis.get("rows", 0)
        columns = self.analysis.get("columns", 0)
        missing = self.analysis.get("missing_values", 0)
        duplicates = self.analysis.get("duplicate_rows", 0)

        return (
            f"The uploaded dataset contains {rows} records and "
            f"{columns} columns. "
            f"The analysis identified {missing} missing values and "
            f"{duplicates} duplicate records. "
            "The dataset has been automatically analyzed to evaluate "
            "business performance, financial indicators, operational "
            "efficiency and future growth opportunities."
        )

    # -------------------------------------------------------
    # Dataset Information
    # -------------------------------------------------------

    def dataset_information(self):

        return {
            "Rows": self.analysis.get("rows", 0),
            "Columns": self.analysis.get("columns", 0),
            "Missing Values": self.analysis.get("missing_values", 0),
            "Duplicate Rows": self.analysis.get("duplicate_rows", 0),
            "Memory Usage": self.analysis.get("memory_usage", "-"),
        }

    # -------------------------------------------------------
    # KPI
    # -------------------------------------------------------

    def kpi_section(self):

        return self.analysis.get("kpis", [])

    # -------------------------------------------------------
    # Statistics
    # -------------------------------------------------------

    def statistics(self):

        return self.analysis.get("statistics", {})

    # -------------------------------------------------------
    # Business Findings
    # -------------------------------------------------------

    def business_findings(self):

        findings = []

        stats = self.analysis.get("statistics", {})

        if not stats:
            findings.append(
                "Statistical information was not available for analysis."
            )
            return findings

        for column, values in stats.items():

            total = values.get("total", 0)
            average = values.get("mean", values.get("average", 0))
            maximum = values.get("max", values.get("maximum", 0))
            minimum = values.get("min", values.get("minimum", 0))

            findings.append(
                f"{column} recorded a total value of {total}. "
                f"The average value is {average:.2f}. "
                f"The highest value observed is {maximum}, "
                f"while the lowest value is {minimum}. "
                f"This indicates consistent business activity."
            )

        return findings

    # -------------------------------------------------------
    # Business Growth
    # -------------------------------------------------------

    def growth_analysis(self):

        rows = self.analysis.get("rows", 0)

        if rows >= 1000:
            return (
                "The dataset is sufficiently large for reliable "
                "business analysis and trend identification."
            )

        if rows >= 100:
            return (
                "The dataset provides adequate information for "
                "performance evaluation."
            )

        return (
            "The dataset is relatively small. Future reports "
            "will become more accurate as additional data is collected."
        )

    # -------------------------------------------------------
    # Strengths
    # -------------------------------------------------------

    def strengths(self):

        strengths = []

        if self.analysis.get("missing_values", 0) == 0:
            strengths.append(
                "The dataset contains no missing values."
            )

        if self.analysis.get("duplicate_rows", 0) == 0:
            strengths.append(
                "No duplicate records were detected."
            )

        strengths.append(
            "The uploaded data can support business decision making."
        )

        strengths.append(
            "Business KPIs have been successfully generated."
        )

        return strengths

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

        if not risks:
            risks.append(
                "No significant business risks were detected from the dataset."
            )

        return risks

    # -------------------------------------------------------
    # Opportunities
    # -------------------------------------------------------

    def opportunities(self):

        return [

            "Increase sales in high-performing regions.",

            "Improve marketing for under-performing products.",

            "Develop forecasting models using historical data.",

            "Create interactive executive dashboards.",

            "Use predictive analytics for future planning.",

            "Monitor KPIs regularly to improve decision making."
        ]

    # -------------------------------------------------------
    # Recommendations
    # -------------------------------------------------------

    def recommendations(self):

        recommendations = self.analysis.get("recommendations")

        if recommendations:
            return recommendations

        return [

            "Continue monitoring business performance monthly.",

            "Improve operational efficiency using data-driven insights.",

            "Reduce costs in low-performing business areas.",

            "Expand successful products into new markets.",

            "Track revenue and profit using dashboards.",

            "Adopt AI-powered analytics for strategic planning."
        ]

    # -------------------------------------------------------
    # Conclusion
    # -------------------------------------------------------

    def conclusion(self):

        conclusion = self.analysis.get("conclusion")

        if conclusion:
            return conclusion

        return (
            "The uploaded dataset demonstrates meaningful business "
            "information that can support strategic decision making. "
            "Regular monitoring of KPIs, operational efficiency, "
            "customer behaviour and financial performance will help "
            "the organization achieve sustainable growth."
        )

    # -------------------------------------------------------
    # Generate Complete Report
    # -------------------------------------------------------

    def generate(self):

        return {

            "title": "Business Analysis Report",

            "generated_date": datetime.now().strftime(
                "%d %B %Y %I:%M %p"
            ),

            "executive_summary": self.executive_summary(),

            "dataset_information": self.dataset_information(),

            "kpis": self.kpi_section(),

            "statistics": self.statistics(),

            "business_findings": self.business_findings(),

            "growth_analysis": self.growth_analysis(),

            "strengths": self.strengths(),

            "insights": self.analysis.get("insights", []),

            "risks": self.risks(),

            "opportunities": self.opportunities(),

            "recommendations": self.recommendations(),

            "conclusion": self.conclusion(),
        }