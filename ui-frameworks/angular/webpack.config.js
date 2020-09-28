const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    target: "web",
    module: {
        rules:  [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    esModule: true,
                    minimize: {
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }
            }
            
        ]
    },
   
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: `./src/paperbits/data`, to: `./data` },
                { from: `./src/paperbits/config.design.json`, to: `./config.json` },
                { from: `./src/paperbits/themes/designer/assets/index.html`, to: "index.html" },
                { from: `./src/paperbits/themes/website/assets/styles`, to: "styles" },
                { from: `./src/paperbits/themes/website/assets/page.html`, to: "page.html" },
                { from: `./src/paperbits/themes/designer/styles/fonts`, to: "editors/styles/fonts" },
            ]
        })
    ],
    resolve: {
        extensions: [".ts", ".html"]
    }
};