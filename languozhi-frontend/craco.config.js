const CracoAlias = require('craco-alias');

module.exports = {
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
};
