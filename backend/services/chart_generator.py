class ChartGenerator:

    @staticmethod
    def generate_bar(df, x, y):
        return {
            "chartType": "bar",
            "title": f"{y} by {x}",
            "categories": df[x].astype(str).tolist(),
            "series": [
                {
                    "name": y,
                    "data": df[y].tolist()
                }
            ]
        }

    @staticmethod
    def generate_pie(df, names, values):
        return {
            "chartType": "pie",
            "title": f"{values} Distribution",
            "labels": df[names].astype(str).tolist(),
            "series": df[values].tolist()
        }

    @staticmethod
    def generate_line(df, x, y):
        return {
            "chartType": "line",
            "title": f"{y} Trend",
            "categories": df[x].astype(str).tolist(),
            "series": [
                {
                    "name": y,
                    "data": df[y].tolist()
                }
            ]
        }

    @staticmethod
    def generate_area(df, x, y):
        return {
            "chartType": "area",
            "title": f"{y} Area Analysis",
            "categories": df[x].astype(str).tolist(),
            "series": [
                {
                    "name": y,
                    "data": df[y].tolist()
                }
            ]
        }