module.exports = {
  testMatch: [
    '**/__tests__/*.(js|jsx)',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ],
};
