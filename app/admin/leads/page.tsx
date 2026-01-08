import "server-only";

import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  clearAdminSession,
  getAdminSession,
  setAdminSession
} from "@/lib/auth/adminSession";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

const REQUIRED_EMAIL = "boost.america@aharai.org.il";

function getRequiredPassword() {
  // Keep the password out of the repo: set it in .env (ADMIN_PASSWORD).
  const pw = process.env.ADMIN_PASSWORD ?? null;
  if (!pw) {
    throw new Error("Missing ADMIN_PASSWORD env var for admin auth.");
  }
  return pw;
}

async function loginAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) redirect("/admin/leads?error=missing");

  const expectedEmail = process.env.ADMIN_EMAIL?.trim() || REQUIRED_EMAIL;
  let expectedPassword = "";
  try {
    expectedPassword = getRequiredPassword();
  } catch {
    redirect("/admin/leads?error=config");
  }

  const ok = email === expectedEmail && password === expectedPassword;
  if (!ok) redirect("/admin/leads?error=1");

  setAdminSession(email);
  redirect("/admin/leads");
}

async function logoutAction() {
  "use server";
  clearAdminSession();
  redirect("/admin/leads");
}

export default async function AdminLeadsPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const session = getAdminSession();

  if (!session) {
    const error = searchParams?.error;

    return (
      <main className='min-h-screen bg-black text-white'>
        <div className='mx-auto flex min-h-screen max-w-lg items-center px-6'>
          <div className='w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur'>
            <h1 className='text-2xl font-semibold'>Admin Login</h1>
            <p className='mt-1 text-sm text-white/70'>Sign in to view leads.</p>

            {error ? (
              <div className='mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
                {error === "missing"
                  ? "Please enter both email and password."
                  : error === "config"
                  ? "Admin auth is not configured on the server."
                  : "Invalid credentials."}
              </div>
            ) : null}

            <form action={loginAction} className='mt-6 space-y-4'>
              <div className='space-y-2'>
                <label className='text-sm text-white/80'>Email</label>
                <Input
                  name='email'
                  type='email'
                  required
                  autoComplete='username'
                  placeholder='Email'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm text-white/80'>Password</label>
                <Input
                  name='password'
                  type='password'
                  required
                  autoComplete='current-password'
                  placeholder='Password'
                />
              </div>

              <button
                type='submit'
                className='w-full rounded-lg bg-[#fcd839] px-4 py-3 font-medium text-black hover:bg-[#fcd839]/90'
              >
                Sign in
              </button>
            </form>

            <p className='mt-4 text-xs text-white/50'>
              Configure <code className='text-white/70'>ADMIN_PASSWORD</code>{" "}
              (and optionally <code className='text-white/70'>ADMIN_EMAIL</code>
              ) in your environment.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Server-side fetch of leads (admin key).
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return (
      <main className='min-h-screen bg-black text-white'>
        <div className='mx-auto max-w-6xl px-6 py-10'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-semibold'>Leads</h1>
            <form action={logoutAction}>
              <button
                type='submit'
                className='rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10'
              >
                Logout
              </button>
            </form>
          </div>
          <div className='mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200'>
            Failed to load leads from Supabase.
          </div>
        </div>
      </main>
    );
  }

  const leads = (data ?? []) as Array<Record<string, any>>;

  return (
    <main className='min-h-screen bg-black text-white'>
      <div className='mx-auto max-w-6xl px-6 py-10'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold'>Leads</h1>
            <p className='mt-1 text-sm text-white/70'>
              Showing {leads.length} most recent leads.
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type='submit'
              className='rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10'
            >
              Logout
            </button>
          </form>
        </div>

        <div className='mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Created</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='py-10 text-center'>
                    No leads yet.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead, idx) => (
                  <TableRow key={lead.id ?? idx}>
                    <TableCell className='whitespace-nowrap'>
                      {lead.created_at
                        ? new Date(lead.created_at).toLocaleString()
                        : "—"}
                    </TableCell>
                    <TableCell>{lead.full_name ?? "—"}</TableCell>
                    <TableCell>{lead.email ?? "—"}</TableCell>
                    <TableCell>{lead.phone ?? "—"}</TableCell>
                    <TableCell>{lead.age ?? "—"}</TableCell>
                    <TableCell>{lead.state ?? "—"}</TableCell>
                    <TableCell>{lead.source ?? "—"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
