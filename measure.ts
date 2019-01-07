import { performance } from "perf_hooks";

interface MeasureOptions {
  label?: string;
  scales?: number[];
  withRate?: boolean;
}
const defaultOptions = {
  withRate: true
};

const measure = (func: any, options: MeasureOptions = defaultOptions) => {
  let _options = Object.assign({}, defaultOptions, options);
  const scales = _options.scales || [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const ns = scales.map(n => 10 ** n);
  const label = _options.label || func.name;

  let current = 0.0;
  ns.forEach((n, idx) => {
    let t0 = performance.now();
    func(n);
    let t1 = performance.now();

    let score = t1 - t0;
    let rate = current === 0 ? "-" : "x " + (score / current).toFixed(3);
    console.log(buildMsg(label, n, score, options.withRate ? rate : null));
    current = score;
  });
};

const buildMsg = (
  label: string,
  n: number,
  score?: number,
  rate?: string
): string => {
  let msg = `label: ${label}:${("          " + String(n)).slice(-10)} `;
  if (score)
    msg += `time: ${("000" + score.toFixed(5)).slice(-10)} milliseconds `;
  if (rate) msg += `rate: ${rate}`;
  return msg;
};

export default measure;

export function measureSearch(func, arr) {
  let t0 = performance.now();
  func(arr);
  let t1 = performance.now();

  let score = t1 - t0;
  console.log(buildMsg(func.name, arr.size, score, null));
}
