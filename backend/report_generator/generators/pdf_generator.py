from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
)
from reportlab.lib.enums import TA_CENTER
from reportlab.pdfbase import pdfmetrics


class PDFReportGenerator:

    def __init__(self, report_data, output_path):
        self.report = report_data
        self.output_path = output_path
        self.styles = getSampleStyleSheet()

        self.title_style = self.styles["Heading1"]
        self.title_style.alignment = TA_CENTER

        self.heading_style = self.styles["Heading2"]
        self.normal_style = self.styles["BodyText"]

    # -------------------------------------------------------
    # Dataset Table
    # -------------------------------------------------------

    def dataset_table(self):

        info = self.report["dataset_information"]

        data = [
            ["Metric", "Value"]
        ]

        for key, value in info.items():
            data.append([key, str(value)])

        table = Table(
            data,
            colWidths=[3 * inch, 3 * inch]
        )

        table.setStyle(

            TableStyle(

                [

                    ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),

                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),

                    ("GRID", (0, 0), (-1, -1), 1, colors.black),

                    ("BACKGROUND", (0, 1), (-1, -1), colors.beige),

                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),

                    ("BOTTOMPADDING", (0, 0), (-1, 0), 10),

                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),

                ]

            )

        )

        return table

    # -------------------------------------------------------
    # KPI Table
    # -------------------------------------------------------

    def kpi_table(self):

        kpis = self.report.get("kpis", [])

        if len(kpis) == 0:

            return Paragraph(
                "No KPI information available.",
                self.normal_style
            )

        data = [[
            "Metric",
            "Total",
            "Average",
            "Maximum",
            "Minimum"
        ]]

        for item in kpis:

            data.append([

                item["metric"],

                str(item["total"]),

                str(item["average"]),

                str(item["maximum"]),

                str(item["minimum"])

            ])

        table = Table(data)

        table.setStyle(

            TableStyle(

                [

                    ("BACKGROUND", (0, 0), (-1, 0), colors.green),

                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),

                    ("GRID", (0, 0), (-1, -1), 1, colors.black),

                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),

                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),

                    ("BACKGROUND", (0, 1), (-1, -1), colors.whitesmoke),

                ]

            )

        )

        return table

    # -------------------------------------------------------
    # Bullet List
    # -------------------------------------------------------

    def bullet_list(self, items):

        elements = []

        for item in items:

            elements.append(

                Paragraph(
                    f"• {item}",
                    self.normal_style
                )

            )

        return elements

    # -------------------------------------------------------
    # Generate PDF
    # -------------------------------------------------------

    def generate(self):

        doc = SimpleDocTemplate(
            self.output_path
        )

        elements = []

        # -------------------------
        # Page 1
        # -------------------------

        elements.append(
            Paragraph(
                self.report["title"],
                self.title_style
            )
        )

        elements.append(
            Spacer(1, 0.3 * inch)
        )

        elements.append(
            Paragraph(
                "<b>Generated Date:</b> "
                + self.report["generated_date"],
                self.normal_style,
            )
        )

        elements.append(
            Spacer(1, 0.2 * inch)
        )

        elements.append(
            Paragraph(
                "Executive Summary",
                self.heading_style,
            )
        )

        elements.append(

            Paragraph(

                self.report["executive_summary"],

                self.normal_style,

            )

        )

        elements.append(
            Spacer(1, 0.25 * inch)
        )

        elements.append(

            Paragraph(

                "Dataset Overview",

                self.heading_style

            )

        )

        elements.append(
            self.dataset_table()
        )

        elements.append(
            Spacer(1, 0.3 * inch)
        )

        elements.append(
            Paragraph(
                "KPI Summary",
                self.heading_style
            )
        )

        elements.append(
            self.kpi_table()
        )

        elements.append(PageBreak())
                # -------------------------------------------------
        # PAGE 2
        # -------------------------------------------------

        # Business Insights
        elements.append(
            Paragraph(
                "Business Insights",
                self.heading_style
            )
        )

        insights = self.report.get("insights", [])

        if insights:
            elements.extend(self.bullet_list(insights))
        else:
            elements.append(
                Paragraph(
                    "No business insights available.",
                    self.normal_style,
                )
            )

        elements.append(
            Spacer(1, 0.25 * inch)
        )

        # Risks
        elements.append(
            Paragraph(
                "Potential Risks",
                self.heading_style
            )
        )

        risks = self.report.get("risks", [])

        if risks:
            elements.extend(self.bullet_list(risks))
        else:
            elements.append(
                Paragraph(
                    "No major risks detected.",
                    self.normal_style,
                )
            )

        elements.append(
            Spacer(1, 0.25 * inch)
        )

        # Opportunities
        elements.append(
            Paragraph(
                "Business Opportunities",
                self.heading_style
            )
        )

        opportunities = self.report.get(
            "opportunities",
            []
        )

        if opportunities:
            elements.extend(
                self.bullet_list(opportunities)
            )

        elements.append(
            Spacer(1, 0.25 * inch)
        )

        # Recommendations
        elements.append(
            Paragraph(
                "Recommendations",
                self.heading_style
            )
        )

        recommendations = self.report.get(
            "recommendations",
            []
        )

        if recommendations:
            elements.extend(
                self.bullet_list(recommendations)
            )

        elements.append(
            Spacer(1, 0.3 * inch)
        )

        # Conclusion
        elements.append(
            Paragraph(
                "Conclusion",
                self.heading_style
            )
        )

        elements.append(
            Paragraph(
                self.report.get(
                    "conclusion",
                    "Business report generated successfully."
                ),
                self.normal_style
            )
        )

        elements.append(
            Spacer(1, 0.4 * inch)
        )

        # Footer
        footer = (
            "<font size='9'>"
            "<b>Generated by:</b> AI Business Report Generator"
            "<br/>"
            f"<b>Date:</b> {self.report['generated_date']}"
            "</font>"
        )

        elements.append(
            Paragraph(
                footer,
                self.normal_style
            )
        )

        # -------------------------------------------------
        # Build PDF
        # -------------------------------------------------

        doc.build(elements)

        return self.output_path