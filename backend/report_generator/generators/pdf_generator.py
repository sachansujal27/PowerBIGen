from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
)
from reportlab.lib.units import inch


class PDFReportGenerator:

    def __init__(self, report, output_path):
        self.report = report
        self.output_path = output_path

    def generate(self):

        doc = SimpleDocTemplate(
            self.output_path,
            rightMargin=40,
            leftMargin=40,
            topMargin=40,
            bottomMargin=40,
        )

        styles = getSampleStyleSheet()

        title = styles["Title"]
        title.alignment = TA_CENTER

        heading = styles["Heading1"]
        heading.textColor = colors.HexColor("#0F4C81")

        subheading = styles["Heading2"]
        subheading.textColor = colors.HexColor("#1E88E5")

        normal = styles["BodyText"]

        story = []

        # ---------------------------------------------------
        # COVER PAGE
        # ---------------------------------------------------

        story.append(Paragraph("Business Analysis Report", title))
        story.append(Spacer(1, 15))

        story.append(
            Paragraph(
                "<b>AI Generated Business Intelligence Report</b>",
                normal,
            )
        )

        story.append(Spacer(1, 10))

        story.append(
            Paragraph(
                f"<b>Date:</b> {self.report.get('generated_date','')}",
                normal,
            )
        )

        story.append(Spacer(1, 25))

        story.append(Paragraph("Executive Summary", heading))

        story.append(
            Paragraph(
                self.report.get(
                    "executive_summary",
                    "No summary available.",
                ),
                normal,
            )
        )

        story.append(PageBreak())

        # ---------------------------------------------------
        # DATASET INFORMATION
        # ---------------------------------------------------

        story.append(Paragraph("Dataset Information", heading))
        story.append(Spacer(1, 12))

        info = self.report.get("dataset_information", {})

        table_data = [
            ["Property", "Value"]
        ]

        for key, value in info.items():
            table_data.append([str(key), str(value)])

        table = Table(table_data, colWidths=[220, 220])

        table.setStyle(
            TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0F4C81")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),

                ("GRID", (0, 0), (-1, -1), 1, colors.grey),

                ("BACKGROUND", (0, 1), (-1, -1), colors.whitesmoke),

                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),

                ("BOTTOMPADDING", (0, 0), (-1, 0), 10),

                ("TOPPADDING", (0, 1), (-1, -1), 8),

                ("BOTTOMPADDING", (0, 1), (-1, -1), 8),
            ])
        )

        story.append(table)

        story.append(Spacer(1, 25))

        # ---------------------------------------------------
        # KPI
        # ---------------------------------------------------

        story.append(Paragraph("Key Performance Indicators", heading))
        story.append(Spacer(1, 10))

        kpis = self.report.get("kpis", [])

        if kpis:

            kpi_table = [["KPI", "Value"]]

            for item in kpis:
                kpi_table.append([
                    item.get("title", ""),
                    str(item.get("value", "")),
                ])

            table = Table(kpi_table, colWidths=[220, 220])

            table.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 1, colors.black),
                ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
            ]))

            story.append(table)

        story.append(PageBreak())

        # ---------------------------------------------------
        # BUSINESS INSIGHTS
        # ---------------------------------------------------

        story.append(Paragraph("Business Findings", heading))

        story.append(Spacer(1, 10))

        insights = self.report.get("insights", [])

        if insights:

            for item in insights:

                if isinstance(item, dict):

                    txt = (
                        f"<b>{item.get('column')}</b><br/>"
                        f"Total : {item.get('total')}<br/>"
                        f"Average : {item.get('average')}<br/>"
                        f"Maximum : {item.get('maximum')}<br/>"
                        f"Minimum : {item.get('minimum')}"
                    )

                else:

                    txt = str(item)

                story.append(Paragraph(txt, normal))
                story.append(Spacer(1, 8))

        story.append(Spacer(1, 20))

        # ---------------------------------------------------
        # RISKS
        # ---------------------------------------------------

        story.append(Paragraph("Business Risks", subheading))

        for risk in self.report.get("risks", []):

            story.append(
                Paragraph(f"• {risk}", normal)
            )

        story.append(Spacer(1, 20))

        # ---------------------------------------------------
        # OPPORTUNITIES
        # ---------------------------------------------------

        story.append(Paragraph("Business Opportunities", subheading))

        for item in self.report.get("opportunities", []):

            story.append(
                Paragraph(f"• {item}", normal)
            )

        story.append(Spacer(1, 20))

        # ---------------------------------------------------
        # RECOMMENDATIONS
        # ---------------------------------------------------

        story.append(Paragraph("Recommendations", heading))

        for rec in self.report.get("recommendations", []):

            story.append(
                Paragraph(f"• {rec}", normal)
            )

        story.append(Spacer(1, 25))

        # ---------------------------------------------------
        # CONCLUSION
        # ---------------------------------------------------

        story.append(Paragraph("Conclusion", heading))

        story.append(
            Paragraph(
                self.report.get(
                    "conclusion",
                    "Business analysis completed successfully.",
                ),
                normal,
            )
        )

        story.append(Spacer(1, 30))

        story.append(
            Paragraph(
                "<font color='grey'>Generated by PowerBIGen</font>",
                styles["Italic"],
            )
        )

        doc.build(story)