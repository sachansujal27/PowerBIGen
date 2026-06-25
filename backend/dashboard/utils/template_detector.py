

def detect_dashboard_type(columns):

    cols = [str(col).lower() for col in columns]

    if any(x in cols for x in [
        "sales",
        "revenue",
        "profit"
    ]):
        return "sales"

    if any(x in cols for x in [
        "employee",
        "salary",
        "department"
    ]):
        return "hr"

    if any(x in cols for x in [
        "expense",
        "income",
        "budget"
    ]):
        return "finance"

    if any(x in cols for x in [
        "player",
        "team",
        "runs"
    ]):
        return "sports"

    return "general"