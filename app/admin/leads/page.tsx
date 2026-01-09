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

// פונקציית עזר קטנה לצבעים של הסטטוס
function getStatusBadge(status: string) {
  const s = (status || "new").toLowerCase();
  let styles = "bg-gray-500/20 text-gray-300"; // default
  
  if (s === "new") styles = "bg-blue-500/20 text-blue-300 border-blue-500/30";
  else if (s === "contacted") styles = "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
  else if (s === "qualified") styles = "bg-green-500/20 text-green-300 border-green-500/30";
  else if (s === "lost") styles = "bg-red-500/20 text-red-300 border-red-500/30";

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}>
      {s.charAt(0).toUpperCase() + s.slice(1)}
    </span>
  );
}

// פונקציית עזר לצבעים של העדיפות
function getPriorityBadge(priority: string) {
  const p = (priority || "medium").toLowerCase();
  let color = "text-gray-400";
  
  if (p === "high") color = "text-red-400 font-bold";
  else if (p === "medium") color = "text-yellow-400";
  else if (p === "low") color = "text-blue-400";

  return (
    <span className={`text-xs uppercase tracking-wider ${color}`}>
      {p}
    </span>
  );
}

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
      <div className='mx-auto max-w-[95%] px-4 py-10'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold'>Leads CRM</h1>
            <p className='mt-1 text-sm text-white/70'>
              Managing {leads.length} candidates.
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

        <div className='mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/5'>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[80px]">Priority</TableHead>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="w-[200px]">Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className='py-10 text-center text-white/50'>
                    No leads yet.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead, idx) => (
                  <TableRow key={lead.id ?? idx} className="border-white/10 hover:bg-white/5">
                    {/* Status Badge */}
                    <TableCell>
                      {getStatusBadge(lead.status)}
                    </TableCell>
                    
                    {/* Priority Badge */}
                    <TableCell>
                      {getPriorityBadge(lead.priority)}
                    </TableCell>

                    {/* Date */}
                    <TableCell className='whitespace-nowrap text-xs text-white/60'>
                      {lead.created_at
                        ? new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })
                        : "—"}
                    </TableCell>

                    {/* Name & Age */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{lead.full_name ?? "—"}</span>
                        <span className="text-xs text-white/50">Age: {lead.age ?? "?"}</span>
                      </div>
                    </TableCell>

                    {/* Location (City, Country) */}
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <span>{lead.state ?? "—"}</span>
                        <span className="text-xs text-white/50">{lead.country ?? ""}</span>
                      </div>
                    </TableCell>

                    {/* Source */}
                    <TableCell className="text-sm text-white/70">
                      {lead.source ?? "—"}
                    </TableCell>

                    {/* Contact Info */}
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <a href={`tel:${lead.phone}`} className="hover:text-[#fcd839] transition-colors">{lead.phone}</a>
                        <a href={`mailto:${lead.email}`} className="text-xs text-white/50 hover:text-white transition-colors truncate max-w-[150px]">{lead.email}</a>
                      </div>
                    </TableCell>

                    {/* Personal Message (Truncated) */}
                    <TableCell>
                       {lead.personal_message ? (
                         <div className="max-w-[200px] truncate text-sm text-white/60" title={lead.personal_message}>
                           {lead.personal_message}
                         </div>
                       ) : (
                         <span className="text-white/20 text-xs">—</span>
                       )}
                    </TableCell>
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