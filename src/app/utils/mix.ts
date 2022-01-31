export function mix(pool: string[], order: number[]) {
  let mixedPool: string[] = [];
  mixedPool = order.map((index) => pool[index]);
  return mixedPool;
}
