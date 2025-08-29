# AI Product Support

An intelligent customer support application that allows users to ask questions about product manuals and documentation through an AI-powered chat interface. Built with Next.js and integrated with Azure AI services.

## Features

- **AI-Powered Chat**: Interactive chat interface for asking questions about product manuals
- **PDF Document Viewer**: Built-in PDF viewer for browsing product documentation
- **Real-time Responses**: Streaming AI responses for seamless user experience
- **Modern UI**: Clean, responsive interface built with Tailwind CSS and Radix UI components
- **TypeScript**: Full type safety throughout the application

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **AI Integration**: Azure AI Foundry with OpenAI SDK
- **PDF Handling**: PDF.js and react-pdf
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Environment Setup

Create a `.env.local` file in the root directory with your Azure AI credentials:

```env
AZURE_FOUNDRY_BASE_URL=https://your-resource.services.ai.azure.com/models?api-version=2024-05-01-preview
AZURE_FOUNDRY_API_KEY=your-api-key
AZURE_FOUNDRY_MODEL_ID=your-model-id
```

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/chat/          # Chat API endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── chat/                  # Chat functionality
│   ├── chat.tsx           # Main chat component
│   ├── chat-content.tsx   # Chat messages display
│   ├── chat-context.tsx   # Chat state management
│   └── chat-header.tsx    # Chat header component
├── components/ui/         # Reusable UI components
├── content/               # Content display components
├── footer/                # Footer component
├── header/                # Header component
└── lib/                   # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## Deployment

The application can be deployed on various platforms:

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

### Other Platforms

This Next.js application can also be deployed on:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway
- Render

Make sure to configure your environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## License

This project is private and not licensed for public use.
