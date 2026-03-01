
const _ = require('lodash')

function parseEnv(opts) {

  if (typeof opts === 'string')
    opts = { prefix: opts }

  opts = opts || {}

  const prefix = opts.prefix === undefined ?  '' : opts.prefix+'_'
      , out = {}

  _.forEach(process.env, function (val, key) {
    if (_.startsWith(key, prefix)) {
      const path = key.substring(prefix.length).replace(/_/g, '.')
      _.set(out, path, val)
    }
  })

  return out
}

module.exports = parseEnv;
