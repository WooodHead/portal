/** @format */

const { NODE_ENV = 'development' } = process.env;

console.log(`-- Webpack <${NODE_ENV}> build --`);

module.exports = (options) => {
  const config =
    NODE_ENV !== 'production'
      ? require('./webpack.development.js')(options)
      : require('./webpack.production.js')(options);
  const entry = NODE_ENV !== 'production' ? ['webpack/hot/poll?100', options.entry] : [options.entry];

  const c = {
    ...options,
    ...config,
    entry: [...entry],
    plugins: [...options.plugins, ...config.plugins],
    stats: { ...options.stats, ...config.stats },
  };

  // console.log('Options:', options);
  // console.log('Config:', c);

  return c;
};
