import type {
  AspectKey,
  ConnectionResult,
  SearchEntry,
} from "../types/types";

export function buildGraph(
  combinations: Record<string, string[]>,
): Record<AspectKey, AspectKey[]> {
  const graph: Record<string, string[]> = {};


  function connect(from: string, to: string) {
    graph[from] ??= [];
    graph[from].push(to);
  }

  for (const [compound, ingredients] of Object.entries(combinations)) {
    connect(compound, ingredients[0]);
    connect(ingredients[0], compound);

    connect(compound, ingredients[1]);
    connect(ingredients[1], compound);
  }

  return graph as Record<AspectKey, AspectKey[]>;
}

export function getWeight(
  aspect: AspectKey,
  disabledAspects: Set<AspectKey>,
): number {
  return disabledAspects.has(aspect) ? 100 : 1;
}

export function findConnection(
  graph: Record<AspectKey, AspectKey[]>,
  from: AspectKey,
  to: AspectKey,
  minSteps: number,
  disabledAspects: Set<AspectKey> = new Set(),
): ConnectionResult {
  const queue: SearchEntry[] = [
    {
      aspect: from,
      path: [from],
      cost: 0,
    },
  ];

  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost);

    const current = queue.shift();

    if (!current) {
      return null;
    }

    const stepCount = current.path.length - 1;

    if (current.aspect === to && stepCount > minSteps) {
      return { path: current.path, cost: current.cost };
    }

    for (const neighbour of graph[current.aspect] ?? []) {
      if (current.path.includes(neighbour)) {
        continue;
      }

      queue.push({
        aspect: neighbour,
        path: [...current.path, neighbour],
        cost: current.cost + getWeight(neighbour, disabledAspects),
      });
    }
  }

  return null;
}