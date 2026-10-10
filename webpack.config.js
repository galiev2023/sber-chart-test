const path = require('path');

module.exports = {
    entry: './public/js/chart-setup.js', // Entry point
    output: {
        filename: 'chart-setup.bundle.js', // Output file
        path: path.resolve(__dirname, 'public/js'), // Output directory
    },
    mode: 'development', // Use 'development' for readable output
    devtool: 'source-map', // Generate source maps for debugging
    module: {
        rules: [
            {
                test: /\.js$/, // Process JavaScript files
                exclude: /node_modules/, // Ignore node_modules
                use: [
                    {
                        loader: 'source-map-loader', // Enable source maps
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js'], // Resolve JavaScript files
    },
    stats: 'minimal', // Reduce console noise
};