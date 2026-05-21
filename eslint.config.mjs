import tsPlugin from '@typescript-eslint/eslint-plugin';
import nextConfig from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = [
  ...nextConfig,
  prettierConfig,
  {
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      // 项目使用 images.unoptimized: true，不强制 next/image
      '@next/next/no-img-element': 'off',
    },
  },
];

export default eslintConfig;
