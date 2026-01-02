import 'jest-preset-angular/setup-env/zone';

// Global test environment setup
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
});
