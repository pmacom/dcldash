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
  //     drop_debugger: true
  //   },
  //   output: { quote_style: 1 }
  // })
]

export default {
  input: 'src/index.ts',
  context: 'globalThis',
  output: [
    {
      file: packageJson.main,
      format: 'amd',
      amd: {
        id: packageJson.name
      },
      plugins: minify
    },
    {
      file: packageJson.main,
      format: 'es',
      file: 'dist/bundle.js',
      plugins: minify
    },
  ],
  plugins: [
    resolve({
      preferBuiltins: false,
      browser: true
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    commonjs({
      exclude: 'node_modules',
      ignoreGlobal: true,
    }),
    PROD && terser({ format: { comments: false } }),
  ],
};