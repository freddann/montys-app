export function getRandomElement<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function range(total: number): number[] {
  const result  = [];
  for (let i = 0; i < total; i++) {
    result.push(i);
  }
  return result;
}
