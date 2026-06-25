import pandas as pd

def generate_chart_data(df):

    result = []

    for column in df.columns:

        if df[column].dtype == "object":

            continue

        result.append({

            "column": column,

            "labels": list(range(len(df))),

            "values": list(df[column])

        })

    return result