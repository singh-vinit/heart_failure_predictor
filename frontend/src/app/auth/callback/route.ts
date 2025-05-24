import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  // Create Supabase client with Next.js cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: await cookies() }
  );

  if (code) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        return NextResponse.redirect(
          `${origin}/signin?error=auth_callback_error&message=${encodeURIComponent(
            error.message
          )}`
        );
      }
    } catch (error: any) {
      return NextResponse.redirect(
        `${origin}/signin?error=auth_callback_error&message=${encodeURIComponent(
          error.message || "Unknown error"
        )}`
      );
    }
  }
  console.log("redirecting...")
  // Redirect to your dashboard or desired page after successful login
  return NextResponse.redirect(`${origin}/dashboard`);
}
