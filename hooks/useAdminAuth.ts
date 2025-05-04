import { useState, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Custom hook to handle admin page authorization
 * Restricts access to admin pages in production mode
 * @returns An object containing authorization status
 */
export default function useAdminAuth() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // In development mode, allow access
    // In production mode, redirect to home
    if (process.env.NODE_ENV !== "development") {
      router.replace("/");
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [router]);

  return { isAuthorized, isLoading };
}
