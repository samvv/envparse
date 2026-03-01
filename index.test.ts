import { expect, test } from "bun:test";
import parseEnv from "./index.js";

test("simple env", () => {
  const obj = parseEnv({
    env: {
      'FOO__BAR__BAZ': 'test',
      'BAR__0__EXAMPLE': 'one',
      'BAR__1__EXAMPLE': 'two',
      'BAR__2__EXAMPLE': 'three',
    }
  });
  expect(obj.foo).toBeObject();
  expect(obj.foo.bar).toBeObject();
  expect(obj.foo.bar.baz).toStrictEqual('test');
  expect(obj.bar).toBeArray();
  expect(obj.bar[0]).toBeObject();
  expect(obj.bar[0].example).toStrictEqual('one');
  expect(obj.bar[1]).toBeObject();
  expect(obj.bar[1].example).toStrictEqual('two');
  expect(obj.bar[2]).toBeObject();
  expect(obj.bar[2].example).toStrictEqual('three');
});

test("camel-casing", () => {
  const obj = parseEnv({
    env: {
      'FOO_BAR_BAZ__BAX': 'test',
    }
  });
  expect(obj.fooBarBaz).toBeObject();
  expect(obj.fooBarBaz.bax).toStrictEqual('test');
});

test("parsing numbers", () => {
  const obj = parseEnv({
    env: {
      ONE: '1',
      TWO: '2',
      THREE: '3',
    }
  });
  expect(obj.one).toStrictEqual(1);
  expect(obj.two).toStrictEqual(2);
  expect(obj.three).toStrictEqual(3);
});
