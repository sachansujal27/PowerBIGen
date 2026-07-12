import os

from .analyzers.excel_analyzer import ExcelAnalyzer
from .analyzers.pdf_analyzer import PDFAnalyzer
from .report_generator import BusinessReportGenerator
from .generators.pdf_generator import PDFReportGenerator
from .generators.docx_generator import DOCXReportGenerator


class ReportService:

    def __init__(self, uploaded_file):

        self.uploaded_file = uploaded_file

    # ------------------------------------
    # Detect File Type
    # ------------------------------------

    def get_extension(self):

        return os.path.splitext(
            self.uploaded_file.name
        )[1].lower()

    # ------------------------------------
    # Analyze File
    # ------------------------------------

    def analyze(self):

        extension = self.get_extension()

        if extension in [".xlsx", ".xls", ".csv"]:

            analyzer = ExcelAnalyzer(
                self.uploaded_file.path
            )

            return analyzer.analyze()

        elif extension == ".pdf":

            analyzer = PDFAnalyzer(
                self.uploaded_file.path
            )

            return analyzer.analyze()

        else:

            raise Exception(
                "Unsupported File Type"
            )

    # ------------------------------------
    # Generate Business Report
    # ------------------------------------

    def build_report(self):

        analysis = self.analyze()

        report = BusinessReportGenerator(
            analysis
        )

        return report.generate()

    # ------------------------------------
    # Generate PDF
    # ------------------------------------

    def generate_pdf(
        self,
        report,
        output_path,
    ):

        pdf = PDFReportGenerator(
            report,
            output_path,
        )

        pdf.generate()

        return output_path

    # ------------------------------------
    # Generate DOCX
    # ------------------------------------

    def generate_docx(
        self,
        report,
        output_path,
    ):

        word = DOCXReportGenerator(
            report,
            output_path,
        )

        word.generate()

        return output_path

    # ------------------------------------
    # Complete Pipeline
    # ------------------------------------

    def process(
        self,
        pdf_path,
        docx_path,
    ):

        report = self.build_report()

        self.generate_pdf(
            report,
            pdf_path,
        )

        self.generate_docx(
            report,
            docx_path,
        )

        return report