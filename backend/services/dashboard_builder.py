from .chart_generator import ChartGenerator


class DashboardBuilder:

    @staticmethod
    def build(df):

        numeric_cols = df.select_dtypes(
            include=["int64", "float64"]
        ).columns.tolist()

        categorical_cols = df.select_dtypes(
            include=["object"]
        ).columns.tolist()

        if len(numeric_cols) == 0:
            return {}

        if len(categorical_cols) == 0:
            return {}

        x = categorical_cols[0]
        y = numeric_cols[0]

        return {

            "bar_chart":
                ChartGenerator.generate_bar(
                    df,
                    x,
                    y
                ),

            "pie_chart":
                ChartGenerator.generate_pie(
                    df,
                    x,
                    y
                ),

            "line_chart":
                ChartGenerator.generate_line(
                    df,
                    x,
                    y
                ),

            "area_chart":
                ChartGenerator.generate_area(
                    df,
                    x,
                    y
                )
        }