const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    showCalcTHI: './src/app.ts',
    setCity: './src/utils/setCity.ts',
    showCityResults: './src/utils/showCityResults.ts',
    getWeatherInfo: './src/data/getWeatherInfo.ts',
    countTHIDays: './src/utils/countTHIDays.ts',
    chartTHI: "./src/charts/chartTHI.ts",
    getPrecipitation: "./src/data/getPrecipitation.ts",
    chartPrecipitation: "./src/charts/chartPrecipitation.ts",
    thiTable: "./src/tables/thiTable.ts",
    precipitationTable: "./src/tables/precipitationTable.ts"
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './public'),
    },
    liveReload: true,
    hot: false,
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({template: "public/index.html"})
  ] 
};