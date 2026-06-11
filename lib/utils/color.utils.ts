/**
 * Interpolates between two hex colors based on a coefficient.
 *
 * @param startColor - The hex color for 0% correctness (Failure Red).
 * @param endColor - The hex color for 100% correctness (Success Green).
 * @param coefficient - A value between 0 and 100 representing the position on the gradient.
 * @returns A hex string representing the interpolated color.
 */
export const getGradientColor = (
  startColor: string,
  endColor: string,
  coefficient: number
): string => {
  // Ensure coefficient is within 0-100
  const normalizedCoeff: number = Math.max(0, Math.min(100, coefficient)) / 100;

  // Helper to parse hex to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const cleanHex: string = hex.replace('#', '');
    const r: number = parseInt(cleanHex.substring(0, 2), 16);
    const g: number = parseInt(cleanHex.substring(2, 4), 16);
    const b: number = parseInt(cleanHex.substring(4, 6), 16);
    return [r, g, b];
  };

  // Helper to convert number to hex component
  const toHex = (n: number): string => {
    const hex: string = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const [rStart, gStart, bStart] = hexToRgb(startColor);
  const [rEnd, gEnd, bEnd] = hexToRgb(endColor);

  // Compute interpolated parts
  const r: number = rStart + (rEnd - rStart) * normalizedCoeff;
  const g: number = gStart + (gEnd - gStart) * normalizedCoeff;
  const b: number = bStart + (bEnd - bStart) * normalizedCoeff;

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Returns a hex color on the red-to-green gradient based on correctness.
 * Uses standard failure red (#ef4444) and success green (#22c55e).
 *
 * @param coefficient - Correctness percentage (0-100).
 * @returns Hex color string.
 */
export const getCorrectnessColor = (coefficient: number): string => {
  return getGradientColor('#ef4444', '#22c55e', coefficient);
};
