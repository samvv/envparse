
This is a tiny library for NodeJS which parses environment variables and
converts them into a deeply nested object.

**index.ts**
```ts
import envparse from "envparse";

console.log(envparse('MYAPP'))
```

```bash
$ MYAPP__USER=bobby node index.js
{ user: "bobby" }
```

```bash
$ export MYAPP__DB__USERNAME=root
$ export MYAPP__DB__PASSWORD=supersecretpassword
$ node index.js
{ database: { username: "root", password: "supersecretpassword" } }
```

## API

### parseEnv(opts)

```ts
import { parseEnv } from "envparse";
```

Where `opts` is an object containing: 

 - **prefix**: the prefix that will be searched for _(optional)_
 - **env**: an object containing the environment variables _(optional)_

If `opts` is a string, it will use that string as a prefix.

**Examples:**

```ts
parseEnv('MYAPP');
```

```ts
const config = parseEnv({
  prefix: 'MYAPP',
  env: {
    MYAPP__FOO: 'teststring',
    MYAPP__BAR: 'anotherteststring',
  }
});
```

### parseValue(text)

```ts
import { parseValue } from "envparse";
```

Parse a single environment variable's value into a JavaScript value.

 - The literals `true` and `false` convert to boolean values
 - If the value is convertible to `Number`, it will do so
 - In all other cases it will return the value as plaintext

In a future version JSON objects and arrays will also be accepted.

## License

The MIT License

