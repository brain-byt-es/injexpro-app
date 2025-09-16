"use client";

import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SignUpPage() {
  const { theme, systemTheme } = useTheme();
  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  return (
    <div className="bg-muted relative min-h-screen flex flex-col items-center justify-center p-6 md:p-10">
      {/* Toggle in top-right corner */}
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      {/* Centered logo */}
      <Logo className="mb-8 text-gray-900 dark:text-white" />

      {/* Clerk card */}
      <div className="w-full max-w-sm">
        <SignUp
          appearance={{
            baseTheme: isDark ? dark : undefined,
            layout: { logoPlacement: "none" },
            variables: {
              colorPrimary: "#3b82f6",
              borderRadius: "0.75rem",
            },
            elements: {
              card: "shadow-lg border border-border",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              formButtonPrimary:
                "bg-blue-500 hover:bg-blue-600 text-white",
            },
          }}
        />
      </div>
    </div>
  );
}
