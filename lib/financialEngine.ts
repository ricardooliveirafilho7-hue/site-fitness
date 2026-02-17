export type SetupData = {
  averageTicket: number;
  strongDayRevenue: number;
  weakDayRevenue: number;
  strongDaysPerWeek: number;
  weakDaysPerWeek: number;
  fixedCosts: number;
  variableCostPercent: number;
  extraMonthlyCosts: number;
  desiredProfitPercent: number;
  openDaysPerWeek: number;
};

export type Projection = {
  monthlyRevenue: number;
  variableCosts: number;
  totalCosts: number;
  profit: number;
};

export function getOpenDaysInMonth(date = new Date(), openDaysPerWeek = 6): number {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const closedPerWeek = Math.max(0, 7 - openDaysPerWeek);
  const estimatedClosedDays = (daysInMonth / 7) * closedPerWeek;
  return Math.max(1, Math.round(daysInMonth - estimatedClosedDays));
}

export function getRemainingOpenDaysFromToday(date = new Date(), openDaysPerWeek = 6): number {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const today = date.getDate();
  const remainingDays = lastDay - today + 1;
  const closedPerWeek = Math.max(0, 7 - openDaysPerWeek);
  const estimatedClosedDays = (remainingDays / 7) * closedPerWeek;
  return Math.max(1, Math.round(remainingDays - estimatedClosedDays));
}

export function calculateMonthlyRevenue(input: SetupData): number {
  const weeksPerMonth = 4.33;
  return (input.strongDayRevenue * input.strongDaysPerWeek + input.weakDayRevenue * input.weakDaysPerWeek) * weeksPerMonth;
}

export function calculateProfit(input: SetupData): Projection {
  const monthlyRevenue = calculateMonthlyRevenue(input);
  const variableCosts = monthlyRevenue * (input.variableCostPercent / 100);
  const totalCosts = input.fixedCosts + input.extraMonthlyCosts + variableCosts;
  const profit = monthlyRevenue - totalCosts;
  return { monthlyRevenue, variableCosts, totalCosts, profit };
}

export function calculateBreakEven(input: SetupData): number {
  const contributionMargin = 1 - input.variableCostPercent / 100;
  if (contributionMargin <= 0) return Number.POSITIVE_INFINITY;
  return (input.fixedCosts + input.extraMonthlyCosts) / contributionMargin;
}

export function calculateDailyTargets(input: SetupData): { dailyTarget: number; remainingDailyTarget: number } {
  const breakEven = calculateBreakEven(input);
  const targetRevenue = breakEven * (1 + input.desiredProfitPercent / 100);
  const openDays = getOpenDaysInMonth(new Date(), input.openDaysPerWeek);
  const remainingOpenDays = getRemainingOpenDaysFromToday(new Date(), input.openDaysPerWeek);
  return {
    dailyTarget: targetRevenue / openDays,
    remainingDailyTarget: targetRevenue / remainingOpenDays
  };
}

export function calculateRiskLevel(input: SetupData): 'green' | 'yellow' | 'red' {
  const projection = calculateProfit(input);
  const breakEven = calculateBreakEven(input);
  const safetyRatio = projection.monthlyRevenue / breakEven;
  if (projection.profit <= 0 || safetyRatio < 1) return 'red';
  if (safetyRatio < 1.2) return 'yellow';
  return 'green';
}
