// @ts-ignore
import { describe, expect, it } from 'bun:test';
import { CM_PER_IN, heightGap, ftIn, formatHeight } from '@/lib/height';

describe('Height Utility Functions', () => {
  it('correctly calculates gapCm, gapIn, tallerPct, and shorterPct', () => {
    // Alex 170 cm vs Ben 185 cm
    const res1 = heightGap(170, 185);
    expect(res1.gapCm).toBe(15);
    expect(res1.gapIn).toBe(5.9);
    expect(res1.tallerPct).toBe(8.8);
    expect(res1.shorterPct).toBe(8.1);

    // 165 cm vs 178 cm
    const res2 = heightGap(165, 178);
    expect(res2.gapCm).toBe(13);
    expect(res2.gapIn).toBe(5.1);
    expect(res2.tallerPct).toBe(7.9);
    expect(res2.shorterPct).toBe(7.3);

    // Equal heights
    const res3 = heightGap(175, 175);
    expect(res3.gapCm).toBe(0);
    expect(res3.gapIn).toBe(0);
    expect(res3.tallerPct).toBe(0);
    expect(res3.shorterPct).toBe(0);
  });

  it('correctly formats cm into feet and inches with step rounding', () => {
    expect(ftIn(175.0)).toBe("5'9\"");
    expect(ftIn(161.3)).toBe("5'3.5\"");
    expect(ftIn(182.9)).toBe("6'0\"");
  });

  it('correctly formats height according to unit system', () => {
    expect(formatHeight(170, 'metric')).toBe('170 cm');
    expect(formatHeight(170, 'imperial')).toBe("5'7\"");
    expect(formatHeight(33000, 'metric')).toBe('330 m');
  });
});
