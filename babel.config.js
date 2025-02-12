module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
     
      [
        "@babel/preset-react",
        { 
          runtime: "automatic",
          importSource: '@emotion/react' 
        } 
      ],
     
    ],
    plugins: [
      ["inline-react-svg"],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './', // Adjust this path to match your project's structure
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      ],
    ],
  };
};
