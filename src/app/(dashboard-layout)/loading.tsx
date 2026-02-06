import { LayoutDashboard, Loader2 } from "lucide-react";

const AdminLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center space-y-6">
        <div className="relative inline-block">
          <LayoutDashboard className="w-16 h-16 text-blue-600 dark:text-blue-400" />
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 absolute -bottom-2 -right-2 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Loading Dashboard
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Preparing your workspace...
          </p>
        </div>
        <div className="flex gap-1.5 justify-center">
          <div
            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: "200ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: "400ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoading;
