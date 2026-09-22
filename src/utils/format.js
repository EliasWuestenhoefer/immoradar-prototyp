export const eur = (n) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";
export const pct = (n) => n.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " %";
export const parseEur = (s) => Number(String(s).replace(/[^\d-]/g, "")) || 0;
