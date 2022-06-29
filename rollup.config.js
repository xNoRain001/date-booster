import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',

  output: {
    file: './dist/date-booster.js',
    format: 'umd',
    name: 'DateBooster'
  },
  
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}