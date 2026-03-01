
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
$ export MYAPP__DATABASE__USERNAME=bla
$ export MYAPP__DATABASE__PASSWORD=morebla
$ node index.js
{ database: { username: "bla", password: "morebla" } }
```

## API

### parseEnv(opts)

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

## License

The MIT License

