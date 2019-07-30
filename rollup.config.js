import nodeResolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/scrollto.esm.js',
      format: 'es',
      sourcemap: true,
      name: 'scrollTo'
    },
    {
      file: 'dist/scrollto.common.js',
      format: 'cjs',
      sourcemap: true,
      name: 'scrollTo'
    }
  ],

  plugins: [
    nodeResolve(),

    cjs({
      namedExports: { './scrollto.common.js': ['scrollto'] }
    }),

    babel({
      exclude: 'node_modules/**'
    })
  ]
}
