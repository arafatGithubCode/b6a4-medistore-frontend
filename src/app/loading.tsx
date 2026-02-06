import { Loader2 } from "lucide-react";

const LoadingHomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
          <Loader2 className="w-20 h-20 text-blue-600 dark:text-blue-400 absolute top-0 left-0 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Loading MediStore
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Please wait while we prepare your experience...
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <div
            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingHomePage;
