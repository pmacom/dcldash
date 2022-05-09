import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import externals from 'rollup-plugin-node-externals'
import { terser } from 'rollup-plugin-terser'

const packageJson = require('./package.json')
const PROD = !!process.env.CI

const minify = [
  // terser({
  //   ecma: 2020,
  //   mangle: { toplevel: true },
  //   compress: {
  //     module: true,
  //     toplevel: true,
  //     unsafe_arrows: true,
  //     drop_debugger: true,
  //   },
  //   format: {
  //     'keep-fnames': true,
  //   },
  //   // output: { quote_style: 1 },
  // })
]

export default {
  input: 'src/index.ts',
  context: 'globalThis',
  output: [
    {
      file: packageJson.main,
      format: 'amd',
      sourcemap: true,
      amd: {
        id: packageJson.name
      },
      plugins: minify
    },
    {
      file: packageJson.main,
      format: 'es',
      sourcemap: true,
      file: 'dist/bundle.js',
      plugins: minify
    },
  ],
  plugins: [
    externals(),
    resolve({
      preferBuiltins: true,
      browser: true
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    commonjs({
      exclude: 'node_modules',
      ignoreGlobal: true,
    }),
    // terser({ format: { comments: false } })
    terser({



      // ecma: 2020,
      // mangle: { toplevel: true },
      // compress: {
      //   module: true,
      //   toplevel: true,
      //   unsafe_arrows: true,
      //   drop_debugger: true,
      // },
      // format: {
      //   comments: 'all',
      // },



      mangle: {
        toplevel: false,
        module: false,
        eval: true,
        keep_classnames: true,
        keep_fnames: true,
        reserved: ['global', 'globalThis', 'define']
      },
      compress: {
        passes: 2
      },
      format: {
        ecma: 5,
        comments: /^!/,
        beautify: false
      },
      toplevel: false

      // output: { quote_style: 1 },
    })
  ],
};