// 문자열을 djb2 해시로 32비트 정수 시드로 바꾼다. 같은 문자열은 항상 같은 시드가 나온다.
export function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

// mulberry32 - 시드 하나로 재현 가능한 0~1 사이 난수를 계속 뽑아낼 수 있는 작은 PRNG.
// 같은 시드로 만든 rng()를 순서대로 호출하면 항상 같은 값들이 나온다.
export function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 배열에서 rng() 값으로 하나를 결정론적으로 골라 반환한다.
export function pick<T>(items: readonly T[], rng: () => number): T {
  const index = Math.floor(rng() * items.length);
  return items[Math.min(index, items.length - 1)];
}
