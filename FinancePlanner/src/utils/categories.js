export const EXPENSE_CATEGORIES = [
  'Food',
  'Education',
  'Housing',
  'Transport',
  'Utilities',
  'Health',
  'Entertainment',
  'Other',
]

export const INCOME_CATEGORIES = ['Scholarship', 'Salary', 'Freelance', 'Investments', 'Gifts', 'Other']

export const CATEGORIES = { income: INCOME_CATEGORIES, expense: EXPENSE_CATEGORIES }

const META = {
  Food: { icon: '🍔', chip: 'bg-amber-100 text-amber-700', iconBg: 'bg-amber-500' },
  Education: { icon: '🎓', chip: 'bg-rose-100 text-rose-700', iconBg: 'bg-rose-500' },
  Housing: { icon: '🏠', chip: 'bg-blue-100 text-blue-700', iconBg: 'bg-blue-500' },
  Transport: { icon: '🚗', chip: 'bg-violet-100 text-violet-700', iconBg: 'bg-violet-500' },
  Utilities: { icon: '💡', chip: 'bg-cyan-100 text-cyan-700', iconBg: 'bg-cyan-500' },
  Health: { icon: '❤️', chip: 'bg-pink-100 text-pink-700', iconBg: 'bg-pink-500' },
  Entertainment: { icon: '🎬', chip: 'bg-fuchsia-100 text-fuchsia-700', iconBg: 'bg-fuchsia-500' },
  Scholarship: { icon: '📚', chip: 'bg-emerald-100 text-emerald-700', iconBg: 'bg-emerald-500' },
  Salary: { icon: '💼', chip: 'bg-green-100 text-green-700', iconBg: 'bg-green-500' },
  Freelance: { icon: '💻', chip: 'bg-teal-100 text-teal-700', iconBg: 'bg-teal-500' },
  Investments: { icon: '📈', chip: 'bg-lime-100 text-lime-700', iconBg: 'bg-lime-500' },
  Gifts: { icon: '🎁', chip: 'bg-sky-100 text-sky-700', iconBg: 'bg-sky-500' },
  Other: { icon: '🛍️', chip: 'bg-slate-100 text-slate-700', iconBg: 'bg-slate-500' },
}

export function categoryMeta(category) {
  return META[category] || META.Other
}

const CHART_COLORS = [
  '#f59e0b',
  '#f43f5e',
  '#3b82f6',
  '#8b5cf6',
  '#06b6d4',
  '#ec4899',
  '#d946ef',
  '#64748b',
]

export function categoryColor(index) {
  return CHART_COLORS[index % CHART_COLORS.length]
}
