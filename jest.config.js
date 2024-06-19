module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  };
  