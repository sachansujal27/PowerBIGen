export default function Suggestion({ latest }) {
  if (!latest) return null;
  let msg = "";
  if (latest.sales < latest.expense) {
    msg = "Reduce expenses or increase pricing:";
  } else {
    msg = "Business is growing . invest more in Marketing";
  }
  return <h3>{msg}</h3>;
}
