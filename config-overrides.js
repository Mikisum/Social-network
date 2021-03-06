const { override, fixBabelImports, addLessLoader } = require('customize-cra')
module.exports = override(
  fixBabelImports('antd', {
    // libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@highlight-color': '@red-5',
        '@normal-color': '#d9d9d9',
        '@white': '#fff',
        '@black': '#000',
        '@primary-color': '#8A2BE2', // custom
        '@border-radius-base': '8px', // custom
        '@icon-color': '#8A2BE2',
        '@text-color':'fade(@black, 85%)',
        '@text-color-secondary': 'fade(@black, 45%)',
        '@text-color-inverse': '@white',

      },
    },
  })
)