/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withNextIntl(nextConfig);
