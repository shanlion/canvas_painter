const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    // 程序的入口在哪里
    entry: {
        index: './pages/index.tsx'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    // 配置出口
    output: {
        // 出口路径
        path: path.resolve(__dirname, 'dist')
    },
    // 编译tsx
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              use: [
                "ts-loader"
              ]
              // 如果用了ts文件,使用下面loader翻译成js
            //   loader: 'awesome-typescript-loader'
            },
            {
                test: /\.css$/,
                use: [  // webpack会从右往左加载loader，所有书写loader时有顺序要求
                {
          　　　　　　loader: 'style-loader'  //style-loader不能和mini-css-extract-plugin同时使用
          　　　　},
                {
        　　　　　　　loader: 'css-loader'
        　　　　　}
                ]           
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}