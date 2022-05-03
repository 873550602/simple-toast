const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    mode: 'production',
    entry: '/src/index.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.bundle.js',
    },
    module: {
        rules: [{
            test: /\.vue$/, loader: "vue-loader", options: {
                esModule: true
            }
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.js$/,
            loader: "babel-loader",
        },
        {
            test: /\.png|jpg|jpeg|svg$/,
            loader: "url-loader",
            options: {
                limit: 1024 * 20
            }
        },
            // {
            //     test: /\.ts$/,
            //     use: ["babel-loader", {
            //         loader: "ts-loader",
            //         options: { appendTsSuffixTo: [/\.vue$/] }
            //     }],
            //     exclude: /node_modules/
            // }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        },
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}