import { Button } from "@/components/ui/button";
import { FileQuestion, Home, Search } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-purple-50 to-pink-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <FileQuestion
                className="w-32 h-32 text-purple-600 dark:text-purple-400"
                strokeWidth={1.5}
              />
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-2xl"></div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-slate-900 dark:text-white">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
              Page Not Found
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Sorry, we couldn't find the page you're looking for. It might have
              been moved or deleted.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/">
            <Button className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button
              variant="outline"
              className="inline-flex items-center gap-2 w-full sm:w-auto"
            >
              <Search className="w-4 h-4" />
              Browse Medicines
            </Button>
          </Link>
        </div>

        <div className="pt-8">
          <p className="text-sm text-slate-500 dark:text-slate-600">
            Need help?{" "}
            <Link
              href="/"
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
