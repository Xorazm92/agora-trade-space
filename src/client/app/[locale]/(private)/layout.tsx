"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CustomLoader from "@/app/components/feedback/CustomLoader";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CustomLoader />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to sign-in
  }

  return <>{children}</>;
}
