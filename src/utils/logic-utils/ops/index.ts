import { and as andImpl, or as orImpl, not as notImpl } from './impl';

type LogcOp = (rule: string[] | string, facts: Set<string>) => boolean;

function generateLogicalOp(fn: LogcOp) {
  function logicalOp(rules: string[] | string) {
    return fn.bind(null, rules);
  }

  return logicalOp;
}

export const or = generateLogicalOp(orImpl);
export const and = generateLogicalOp(andImpl);
export const not = generateLogicalOp(notImpl);
