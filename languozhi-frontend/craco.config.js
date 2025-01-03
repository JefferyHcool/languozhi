// eslint-disable-next-line @typescript-eslint/no-require-imports
const CracoAlias = require('craco-alias')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // or 'jsconfig'
        baseUrl: './src',
        tsConfigPath: './tsconfig.paths.json'
      }
    }
  ]
}
