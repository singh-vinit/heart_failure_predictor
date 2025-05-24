import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-rose-50 to-red-100">
        {children}
      </div>
      <Toaster />
    </>
  );
}
