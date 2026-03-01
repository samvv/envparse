
export type ParseEnvOptions = {
  prefix?: string;
  env?: Record<string, string>;
};

export function parseEnv(opts: ParseEnvOptions | string): any {

  if (typeof opts === 'string')
    opts = { prefix: opts }

  opts = opts || {}

  const env = opts.env ?? process.env;
  const prefix = opts.prefix === undefined ?  '' : `${opts.prefix}__`;

  const out = {};

  for (const [key, val] of Object.entries(env)) {
    if (key.startsWith(prefix)) {
      const path = parsePath(key.substring(prefix.length));
      setDeep(out, path, val === undefined ? undefined : parseValue(val));
    }
  }

  return out
}

export function parseValue(text: string): any {
  if (text === 'true') {
    return true;
  }
  if (text === 'false') {
    return false;
  }
  const num = Number(text);
  if (!isNaN(num)) {
    return num;
  }
  return text;
}

function parsePath(value: string): Array<string | number> {
  return value.split('__').map(element => {
    const num = Number(element);
    if (!isNaN(num)) {
      return num;
    }
    return camelCase(element);
  });
}

function camelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/_([a-z0-9])/g, (_match, char) => char.toUpperCase());
}

function setDeep(target: any, path: Array<string | number>, value: any): any {

  if (!target || typeof target !== 'object') {
    throw new Error('Target must be an object.');
  }

  let current = target;

  for (let i = 0; i < path.length; i++) {
    const key = path[i]!;
    const isLast = i === path.length - 1;

    if (isLast) {
      current[key] = value;
    } else {
      if (current[key] === undefined || current[key] === null) {
        const nextKey = path[i + 1];
        current[key] = typeof nextKey === 'number' ? [] : {};
      }
      current = current[key];
    }
  }

  return target;
}

export default parseEnv;
