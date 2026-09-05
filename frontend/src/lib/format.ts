/**
 * Formats a number as Indian Rupees.
 * 130000 -> "₹1,30,000.00"
 *
 * Note: this is display only. All real money maths happens in the
 * backend using Python Decimal. The browser never calculates money.
 */
export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}