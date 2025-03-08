const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Remove or comment out this line
// const { getFileLoader } = require("./utils");

const mode = process.env.NODE_ENV || "development";
const devMode = process.env.NODE_ENV !== "production";
const target = devMode ? "web" : "browserlist";
const devtool = devMode ? "source-map" : undefined;

const pages = ["index", "notes", "weather", "calculator"];
module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 8080,
    open: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    }
  },
  entry: {
    index: "./src/index/index.js",
    notes: "./src/notes/notes.js",
    calculator: "./src/calculator/calculator.js",
    weather: "./src/weather/weather.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [].concat(
    pages.map((page) => {
      return new HtmlWebpackPlugin({
        inject: "body",
        template: `./src/${page}/${page}.html`,
        filename: `${page}.html`,
        chunks: [page],
      });
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new Dotenv()
  ),
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      }
    ],
  },
};
