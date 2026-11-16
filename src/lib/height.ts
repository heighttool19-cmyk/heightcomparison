export const CM_PER_IN = 2.54;

const r1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Calculates differences and directional percentages between two heights in cm.
 * - tallerPct: how much taller the taller one is relative to the shorter one: (gap / shorter) * 100
 * - shorterPct: how much shorter the shorter one is relative to the taller one: (gap / taller) * 100
 */
export function heightGap(aCm: number, bCm: number) {
  const taller = Math.max(aCm, bCm);
  const shorter = Math.min(aCm, bCm);
  const gapCm = taller - shorter;

  if (gapCm === 0 || shorter === 0) {
    return {
      gapCm: 0,
      gapIn: 0,
      tallerPct: 0,
      shorterPct: 0,
    };
  }

  return {
    gapCm: r1(gapCm),
    gapIn: r1(gapCm / CM_PER_IN),
    tallerPct: r1((gapCm / shorter) * 100),
    shorterPct: r1((gapCm / taller) * 100),
  };
}

/**
 * Formats a height in cm to feet and inches (e.g. 175 -> 5'9", 161.3 -> 5'3.5")
 */
export function ftIn(cm: number, step = 0.5): string {
  const total = Math.round(cm / CM_PER_IN / step) * step;
  const ft = Math.floor(total / 12);
  const inch = +(total - ft * 12).toFixed(1);
  return `${ft}'${inch}"`;
}

/**
 * Formats a height value for display given the active unit system.
 */
export function formatHeight(cm: number, unitSystem: 'metric' | 'imperial'): string {
  if (unitSystem === 'metric') {
    if (cm >= 1000) {
      return `${(cm / 100).toFixed(cm % 100 === 0 ? 0 : 2)} m`;
    }
    return `${Math.round(cm)} cm`;
  }
  if (cm >= 1000) {
    const totalFt = Math.round(cm / CM_PER_IN / 12);
    return `${totalFt.toLocaleString()} ft`;
  }
  const totalIn = Math.round(cm / CM_PER_IN);
  const ft = Math.floor(totalIn / 12);
  const inch = totalIn % 12;
  return `${ft}'${inch}"`;
}

