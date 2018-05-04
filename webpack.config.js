const webpack = require("webpack");
const path = require("path");
const fileSystem = require("fs");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// load the secrets
const alias = {};

const secretsPath = path.join(__dirname, "secrets." + process.env.NODE_ENV + ".js");

if (fileSystem.existsSync(secretsPath)) {
  alias["secrets"] = secretsPath;
}

const extractCSS = new ExtractTextPlugin({
  filename: "[name].[chunkhash]-css.css",
  allChunks: true
});
const extractLESS = new ExtractTextPlugin({
  filename: "[name].[chunkhash]-less.css",
  allChunks: true
});

const commonConfig = {
  entry: {
    popup: path.join(__dirname, "src", "containers", "Popup.js"),
    options: path.join(__dirname, "src", "containers", "Options.js"),
    background: path.join(__dirname, "src", "containers", "Background.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  plugins: [
    // clean the dist folder
    new CleanWebpackPlugin(["dist"]),
    new CopyWebpackPlugin([
      {
        from: "src/images/",
        to: "./images/",
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: "src/manifest.json",
        // transform: function(content, path) {
        //   // generates the manifest file using the package.json informations
        //   return Buffer.from(
        //     JSON.stringify(
        //       Object.assign(
        //         {},
        //         {
        //           description: process.env.npm_package_description,
        //           version: process.env.npm_package_version
        //         },
        //         content
        //       )
        //     )
        //   );
        // }
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "templates", "index.html"),
      title: 'This is popup',
      filename: "popup.html",
      inject: "body",
      hash: false,
      chunks: ["popup"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "templates", "index.html"),
      title: 'This is options',
      filename: "options.html",
      inject: "body",
      hash: false,
      chunks: ["options"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "templates", "index.html"),
      title: 'This is background',
      filename: "background.html",
      inject: "body",
      hash: false,
      chunks: ["background"]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|eot|svg|ttf|woff|woff2|mp4)\??.*$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name]_[hash:8].[ext]"
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader?cacheDirectory",
          options: {
            presets: [["es2015", { module: false }], "react", "stage-0"],
            plugins: [
              "add-module-exports",
              "transform-runtime",
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss", ".less", ".json"],
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      containers: path.resolve(__dirname, "./src/containers"),
      constants: path.resolve(__dirname, "./src/constants"),
      static: path.resolve(__dirname, "./src/static"),
      utils: path.resolve(__dirname, "./src/utils")
    }
  }
};

module.exports = (env, argv) => {
  const { mode } = argv;
  console.log("mode =>", mode);
  let config = {};

  // production environment
  if (mode === "production") {
    config = Object.assign({}, commonConfig, {
      optimization: {
        runtimeChunk: {
          name: "manifest"
        },
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendor",
              chunks: "all"
            }
          }
        }
      }
    });
    config.plugins = config.plugins.concat([extractCSS, extractLESS]);
    config.module.rules = config.module.rules.concat([
      {
        test: /\.css$/,
        use: extractCSS.extract(["css-loader?minimize"])
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract(["css-loader?minimize", "less-loader"])
      }
    ]);
  } else {
    // development environment
    config = Object.assign({}, commonConfig);
    config.devtool = "cheap-module-eval-source-map";
    config.module.rules = config.module.rules.concat([
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ]);
  }
  return config;
};
