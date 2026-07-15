import os

from .analyzers.excel_analyzer import ExcelAnalyzer
from .analyzers.pdf_analyzer import PDFAnalyzer
from .report_generator import BusinessReportGenerator
from .generators.pdf_generator import PDFReportGenerator
from .generators.docx_generator import DOCXReportGenerator


class ReportService:

    def __init__(self, uploaded_file):
        self.uploaded_file = uploaded_file

    # --------------------------------------------------
    # Detect File Type
    # --------------------------------------------------

    def get_extension(self):
        return os.path.splitext(self.uploaded_file.name)[1].lower()

    # --------------------------------------------------
    # Analyze Uploaded File
    # --------------------------------------------------

    def analyze(self):

        extension = self.get_extension()

        print("Extension:", extension)

        if extension in [".xlsx", ".xls", ".csv"]:

            analyzer = ExcelAnalyzer(self.uploaded_file.path)

        elif extension == ".pdf":

            analyzer = PDFAnalyzer(self.uploaded_file.path)

        else:

            raise Exception("Unsupported file type.")

        analysis = analyzer.analyze()

        print("Analysis Result:")
        print(analysis)

        if analysis is None:
                raise ValueError(
        "ExcelAnalyzer.analyze() returned None. "
        "Check excel_analyzer.py and ensure it returns a dictionary."
    )

        return analysis

    # --------------------------------------------------
    # Build Business Report
    # --------------------------------------------------

    def build_report(self):

        analysis = self.analyze()

        generator = BusinessReportGenerator(analysis)

        report = generator.generate()

        return report

    # --------------------------------------------------
    # Generate PDF
    # --------------------------------------------------

    def generate_pdf(self, report, output_path):

        pdf = PDFReportGenerator(report, output_path)

        pdf.generate()

        return output_path

    # --------------------------------------------------
    # Generate DOCX
    # --------------------------------------------------

    def generate_docx(self, report, output_path):

        docx = DOCXReportGenerator(report, output_path)

        docx.generate()

        return output_path

    # --------------------------------------------------
    # Complete Pipeline
    # --------------------------------------------------

    def process(self, pdf_path, docx_path):

        report = self.build_report()

        self.generate_pdf(report, pdf_path)

        self.generate_docx(report, docx_path)

        return report