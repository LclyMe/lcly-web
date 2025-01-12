# Lcly - UK Local Community Platform

![Lcly Logo](public/union-flag.png)

Lcly is an open-source project building digital infrastructure for local communities across the UK. Our mission is to create a platform that helps people connect, engage, and strengthen their local communities.

## Features

- 🤝 Connect with Neighbours
- 📰 Local News & Updates
- 👥 Community Leadership
- 🗳️ Local Democracy
- 🏗️ Community Projects
- 🛡️ Community Safety
- 📚 Local Education
- ❤️ Local Charity

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org)
- **Database**: [Supabase](https://supabase.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Authentication**: Supabase Auth
- **Deployment**: [Vercel](https://vercel.com)

## Self-hosting

To self-host the platform, you will need to set up a Supabase account and configure the environment variables.

## Local Development

1. Clone the repository:

```bash
git clone https://github.com/lcly/lcly-web.git
cd lcly-web
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to:

- Follow the existing code style
- Add tests if applicable
- Update documentation as needed
- Reference any related issues in your PR

## Development Guidelines

- Use TypeScript for all new code
- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
- Ensure your code passes all existing tests
- Add appropriate documentation for new features
- Use components from shadcn/ui when possible

## Project Structure

```
lcly-web/
├── app/                # Next.js app directory
├── components/         # Reusable components
├── lib/               # Utility functions and types
├── public/            # Static assets
└── supabase/          # Supabase configuration
```

## Database Schema

The database schema is managed through Supabase. You can find the latest schema in the `supabase/config.toml` file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- GitHub: [github.com/lclyme](https://github.com/lclyme)
- Twitter: [@lclyme](https://twitter.com/lclyme)
- Instagram: [@lcly.me](https://instagram.com/lcly.me)

## Acknowledgments

- Thanks to all contributors who have helped shape Lcly
- Built with [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
