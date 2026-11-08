/** Numbers with thousands separators: 12,345. */
export function count(value: number): string {
  return value.toLocaleString("en-US");
}

/** Sizes for people: 512 bytes, 3.4 MB, 1.2 GB. */
export function bytes(value: number): string {
  if (value < 1024) return `${count(value)} bytes`;
  const units = ["KB", "MB", "GB", "TB"];
  let size = value / 1024;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit++;
  }
  return `${size.toLocaleString("en-US", { maximumFractionDigits: 1 })} ${units[unit]}`;
}
