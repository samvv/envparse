
This is a tiny library for NodeJS which parses environment variables and
converts them into a deeply nested object.

**index.js**
```js
var envparse = require('envparse')

console.log(envparse('TEST'))
```


```bash
$ TEST_user=bobby node index.js
{ user: "bobby" }
``` 

```bash
$ TEST_database_username=bla
$ TEST_database_password=morebla
$ node index.js
{ database: { username: "bla", password: "morebla" } }
```

## API

### envparse(opts)

Where `opts` is an object containing: 

 - **prefix**: the prefix that will be searched for _optional_  

If `opts` is a string, it will use that string as a prefix.

## License 

The MIT License


