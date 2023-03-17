export type LogicOp = (facts: Set<string>) => boolean;

export function logicFilter(rule: string | string[] | LogicOp, facts: Set<string>) {
  if (typeof rule === 'string') {
    return facts.has(rule);
  }
  if (rule instanceof Array) {
    return rule.some((permission) => facts.has(permission));
  }
  if (rule instanceof Function) {
    return rule(facts);
  }

  console.error('Rules is not recognized', rule);

  return false;
}
