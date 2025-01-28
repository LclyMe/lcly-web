import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-6 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-white/10 p-4">
            <Search className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-white mb-2">
          Page not found
        </h1>
        <p className="text-white/80 mb-8">
          We couldn't find the page you're looking for. The page might have been
          removed, renamed, or doesn't exist.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => window.history.back()}
            className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md w-full max-w-[200px] transition-colors"
          >
            Go back
          </button>
          <div className="block">
            <a
              href="/"
              className="inline-block px-4 py-2 bg-white text-black hover:bg-white/90 rounded-md w-full max-w-[200px] transition-colors"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
