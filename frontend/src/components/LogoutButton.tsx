"use client";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  return (
    <Button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
    >
      Logout
    </Button>
  );
}
