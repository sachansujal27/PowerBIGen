export default function TemplateCard({ template, onSelect }) {
  return (
    <div
      onClick={() => onSelect(template)}
      className="cursor-pointer rounded-xl border
      border-slate-700 hover:border-indigo-500
      p-3 bg-slate-800"
    >
      <img src={template.image} alt={template.name} className="rounded-lg" />

      <h3 className="mt-2 text-center text-white">{template.name}</h3>
    </div>
  );
}
