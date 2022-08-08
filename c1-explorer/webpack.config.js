const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV != "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",

  // possibilita visualizar o código original da aplicação, mesmo após processado no bundle.js:
  devtool: isDevelopment ? "eval-source-map" : "source-map",

  // arquivo inicial da app:
  entry: path.resolve(__dirname, "src", "index.tsx"),

  // arquivo de saída gerado:
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  // configura para ler outros tipos de extensões:
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  //automatizar a criação do bundle.js:
  // obs: antes de 'static' era 'contentBase':
  devServer: {
    static: path.resolve(__dirname, "public"),
    hot: true,
  },

  //define o caminho do arquivo de template (modelo) que será usado para gerar o dist\index.html:
  plugins: [
    /**
     * Se estiver em desenvolvimento, executa o plugin, porém, se estiver em produção retorna false,
     * o que seria inválido em "plugins". Por isso utiliza-se um "rack" acrescentando o filter(Boolean)
     * ao final de "plugins".
     */
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean),

  // comportamento para cada tipo de arquivo:
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [isDevelopment && require.resolve("react-refresh/babel")].filter(Boolean),
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
