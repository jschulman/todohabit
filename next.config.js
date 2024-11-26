/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                ],
            },
        ]
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3001'],
        },
    },
}

module.exports = nextConfig 