"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const AppDashboardItem = ({ tab, title }: { tab: string; title: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSetTab = useCallback(
    (tab: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tab.toLowerCase());

      return params.toString();
    },
    [searchParams],
  );

  return (
    <>
      <p
        className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        onClick={() => {
          router.push(pathname + "?" + handleSetTab(tab));
        }}
      >
        {title}
      </p>
    </>
  );
};

export default AppDashboardItem;
