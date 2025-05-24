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
      className="px-4 py-2 bg-rose-600 text-white hover:bg-rose-700 cursor-pointer rounded-md"
    >
      Logout
    </Button>
  );
}
