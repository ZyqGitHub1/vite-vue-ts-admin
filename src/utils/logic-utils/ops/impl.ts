/* eslint-disable no-param-reassign */
export function or(rule: string[] | string, facts: Set<string>) {
  if (!rule) {
    return true;
  }

  if (typeof rule === 'string') {
    rule = [rule];
  }

  return rule.some((item) => facts.has(item));
}

export function and(rule: string[] | string, facts: Set<string>) {
  if (!rule) {
    return true;
  }

  if (typeof rule === 'string') {
    rule = [rule];
  }

  return rule.every((item) => facts.has(item));
}

export function not(rule: string[] | string, facts: Set<string>) {
  if (!rule) {
    return true;
  }

  if (typeof rule === 'string') {
    rule = [rule];
  }

  return rule.every((has) => !facts.has(has));
}
