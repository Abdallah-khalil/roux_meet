// import nodejs core module 
const path = require('path');
const Nodemon = require('nodemon-webpack-plugin');
const nodeExt = require('webpack-node-externals');


const config = {

    entry: {
        main: path.join(__dirname, "src/index.ts")
    },

    target: 'node',

    node: {
        __dirname: true
    },

    externals: [nodeExt()],

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },

    plugins: [
        new Nodemon()
    ],

    output: {
        path: path.join(__dirname, "build"),
        filename: "roux-meet.bundle.js"
    },

    module: {
        loaders: [{
            test: /\.ts$/,
            include: [path.resolve(__dirname, "src")],
            loader: "ts-loader"
        }]
    }
};

module.exports = config;