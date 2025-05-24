"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import LogoutButton from "@/components/LogoutButton";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/signin");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };
    getUser();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>dashboard</h1>
      <LogoutButton />
    </div>
  );
}