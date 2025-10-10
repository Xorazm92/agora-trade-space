import { useRouter } from "next/navigation";
import CustomLoader from "../feedback/CustomLoader";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect } from "react";

export function withAuth<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
) {
  return function AuthWrapper(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    console.log("isAuthenticated: ", isAuthenticated);
    console.log("isLoading: ", isLoading);
    const router = useRouter();

    useEffect(() => {
      // Development uchun authentication bypass
      if (process.env.NODE_ENV === 'development') {
        return; // Skip authentication check in development
      }
      
      if (!isLoading && !isAuthenticated) {
        router.push("/sign-in");
      }
    }, [isLoading, isAuthenticated]);

    // Development uchun loading'ni skip qilish
    if (process.env.NODE_ENV === 'development') {
      return <Component {...props} />;
    }

    if (isLoading) return <CustomLoader />;

    return <Component {...props} />;
  };
}
