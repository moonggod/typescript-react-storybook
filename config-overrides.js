/* References:
 * - https://github.com/timarney/react-app-rewired
 * - https://github.com/arackaf/customize-cra
 */
const env = require('env-var')
const { override, addDecoratorsLegacy } = require('customize-cra')

module.exports = (config, env) => {
  return override(
    addDecoratorsLegacy() // for class-validator + class-transformer family
  )(config, env)
}

/**
 * Environment variables validation
 */
env.get('NODE_ENV').asEnum(['development', 'test', 'production'])
env.get('REACT_APP_API_BASE_URL').required().asString()
