"use client";

import { useState, useCallback, useTransition, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ApiClient } from "@/util/service/api/apiClient";
import { handleAsyncAction } from "@/util/service/api/handleAsync";
import { ActionMenu } from "@/components/dashboard/DashboardComps/ReUsableTable/ui/ActionMenu";
import {
  AdminUsersAPI,
  AdminUser,
  AdminUsersResponse,
  UpdateUserPayload,
  UserRole,
} from "@/util/service/api/DashboardApis/admin_users_api";

const PAGE_SIZE = 10;

function toPersianDigits(n: number | string) {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fa-IR", {
    year: "numeric", month: "short", day: "numeric",
  });
}

type RoleLabel = "خریدار" | "فروشنده" | "ادمین";

const roleMap: Record<UserRole, RoleLabel> = {
  buyer:  "خریدار",
  seller: "فروشنده",
  admin:  "ادمین",
};

const roleBadgeStyles: Record<RoleLabel, string> = {
  "خریدار":  "bg-blue-50 text-blue-600 border border-blue-200",
  "فروشنده": "bg-purple-50 text-purple-600 border border-purple-200",
  "ادمین":   "bg-green-50 text-green-700 border border-green-300",
};

function RoleBadge({ role }: { role: UserRole }) {
  const label = roleMap[role] ?? "خریدار";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadgeStyles[label]}`}>
      {label}
    </span>
  );
}

function VerifiedBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
      <span>✓</span> تایید شده
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
      <span>●</span> تایید نشده
    </span>
  );
}

function Avatar({ user }: { user: AdminUser }) {
  if (user.profilePicture) {
    return <img src={user.profilePicture} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />;
  }
  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;
  const colors = ["bg-green-100 text-green-700", "bg-blue-100 text-blue-700", "bg-purple-100 text-purple-700", "bg-orange-100 text-orange-700"];
  const color = colors[user.id % colors.length];
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${color}`}>
      {initials || "؟"}
    </div>
  );
}

function FilterBar({
  email, role, onEmailChange, onRoleChange,
}: {
  email: string; role: UserRole | "";
  onEmailChange: (v: string) => void;
  onRoleChange: (v: UserRole | "") => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <input
        type="text"
        value={email}
        onChange={e => onEmailChange(e.target.value)}
        placeholder="جستجو با ایمیل..."
        className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-600 outline-none focus:border-green-400 w-44 sm:w-56 transition-colors"
        dir="ltr"
      />
      <select
        value={role}
        onChange={e => onRoleChange(e.target.value as any)}
        className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-600 outline-none focus:border-green-400 bg-white cursor-pointer transition-colors appearance-none pr-8 relative"
      >
        <option value="">همه نقش‌ها</option>
        <option value="buyer">خریدار</option>
        <option value="seller">فروشنده</option>
        <option value="admin">ادمین</option>
      </select>
    </div>
  );
}

function EditModal({
  user, onClose, onSave,
}: {
  user: AdminUser; onClose: () => void; onSave: (payload: UpdateUserPayload) => Promise<void>;
}) {
  const [form, setForm] = useState<UpdateUserPayload>({
    email:         user.email,
    fullName:      user.fullName,
    firstName:     user.firstName,
    lastName:      user.lastName,
    phoneNumber:   user.phoneNumber,
    emailVerified: user.emailVerified,
    membershipDate: user.membershipDate ?? "",
    profilePicture: user.profilePicture ?? "",
  });
  const [saving, setSaving] = useState(false);

  const field = (label: string, key: keyof UpdateUserPayload, type = "text", dir = "rtl") => (
    <div>
      <label className="text-xs text-gray-400 block mb-1">{label}</label>
      <input
        type={type}
        value={String(form[key] ?? "")}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        dir={dir}
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-400 transition-colors"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <Avatar user={user} />
            <div>
              <h2 className="text-sm font-bold text-gray-800">{user.fullName || "—"}</h2>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
          {field("نام", "firstName")}
          {field("نام خانوادگی", "lastName")}
          <div className="col-span-2">{field("نام کامل", "fullName")}</div>
          <div className="col-span-2">{field("ایمیل", "email", "email", "ltr")}</div>
          {field("شماره موبایل", "phoneNumber", "tel", "ltr")}
          {field("تاریخ عضویت", "membershipDate", "text", "ltr")}

          <div className="col-span-2">
            <label className="text-xs text-gray-400 block mb-1">تایید ایمیل</label>
            <div className="flex items-center gap-3">
              {[true, false].map(v => (
                <label key={String(v)} className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-600">
                  <input
                    type="radio"
                    checked={form.emailVerified === v}
                    onChange={() => setForm(f => ({ ...f, emailVerified: v }))}
                    className="accent-green-500"
                  />
                  {v ? "تایید شده" : "تایید نشده"}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors">
            انصراف
          </button>
          <button
            onClick={async () => { setSaving(true); await onSave(form); setSaving(false); onClose(); }}
            disabled={saving}
            className="flex-1 bg-green-400 hover:bg-green-500 disabled:opacity-60 text-white font-medium py-2.5 rounded-xl text-sm transition-colors"
          >
            {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirm({ user, onConfirm, onCancel, loading }: {
  user: AdminUser; onConfirm: () => void; onCancel: () => void; loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 z-10 text-center">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-red-500 text-xl">✕</span>
        </div>
        <h2 className="text-sm font-bold text-gray-800 mb-1">حذف کاربر</h2>
        <p className="text-xs text-gray-500 mb-5 leading-5">
          آیا از حذف <strong className="text-gray-700">{user.fullName || user.email}</strong> مطمئن هستید؟ این عمل قابل بازگشت نیست.
        </p>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors">انصراف</button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 bg-red-400 hover:bg-red-500 disabled:opacity-60 text-white py-2 rounded-xl text-sm transition-colors">
            {loading ? "..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PromoteConfirm({ user, onConfirm, onCancel, loading }: {
  user: AdminUser; onConfirm: () => void; onCancel: () => void; loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 z-10 text-center">
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-green-600 text-xl">★</span>
        </div>
        <h2 className="text-sm font-bold text-gray-800 mb-1">ارتقا به ادمین</h2>
        <p className="text-xs text-gray-500 mb-5 leading-5">
          آیا می‌خواهید <strong className="text-gray-700">{user.fullName || user.email}</strong> را به ادمین ارتقا دهید؟
        </p>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors">انصراف</button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 bg-green-400 hover:bg-green-500 disabled:opacity-60 text-white py-2 rounded-xl text-sm transition-colors">
            {loading ? "..." : "ارتقا"}
          </button>
        </div>
      </div>
    </div>
  );
}

function UserCard({ user, onEdit, onDelete, onPromote }: {
  user: AdminUser; onEdit: () => void; onDelete: () => void; onPromote: () => void;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar user={user} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{user.fullName || "—"}</p>
            <p className="text-xs text-gray-400 truncate" dir="ltr">{user.email}</p>
          </div>
        </div>
        <ActionMenu actions={[
          { label: "ویرایش", icon: "✎", onClick: onEdit },
          { label: "ارتقا به ادمین", icon: "★", onClick: onPromote, className: "text-green-600" },
          { label: "حذف", icon: "✕", onClick: onDelete, className: "text-red-500" },
        ]} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-gray-50">
        <div>
          <span className="text-gray-400 block mb-0.5">نقش</span>
          <RoleBadge role={user.role} />
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">وضعیت ایمیل</span>
          <VerifiedBadge verified={user.emailVerified} />
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">موبایل</span>
          <span className="text-gray-700" dir="ltr">{user.phoneNumber || "—"}</span>
        </div>
        <div>
          <span className="text-gray-400 block mb-0.5">تاریخ عضویت</span>
          <span className="text-gray-700">{formatDate(user.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

function Pagination({ current, total, onChange, disabled }: {
  current: number; total: number; onChange: (p: number) => void; disabled: boolean;
}) {
  if (total <= 1) return null;
  const pages = total <= 7
    ? Array.from({ length: total }, (_, i) => i + 1)
    : current <= 4
      ? [1, 2, 3, 4, 5]
      : current >= total - 3
        ? [total - 4, total - 3, total - 2, total - 1, total]
        : [current - 2, current - 1, current, current + 1, current + 2];

  return (
    <div className="flex items-center gap-1 flex-wrap" dir="ltr">
      {pages.map((p) => (
        <button key={p} onClick={() => onChange(p)} disabled={disabled}
          className={`w-8 h-8 rounded-lg text-sm font-medium transition-all disabled:opacity-50 ${p === current ? "bg-green-400 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"}`}>
          {toPersianDigits(p)}
        </button>
      ))}
      {total > 7 && current < total - 3 && (
        <>
          <span className="text-gray-300 px-1">•••</span>
          <button onClick={() => onChange(total)} disabled={disabled}
            className="w-8 h-8 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-green-300 transition-all disabled:opacity-50">
            {toPersianDigits(total)}
          </button>
        </>
      )}
    </div>
  );
}

interface Props {
  token: string;
  initialData: AdminUsersResponse;
  initialPage: number;
  initialEmail: string;
  initialRole: UserRole | "";
}

export default function AdminUsersPage({ token, initialData, initialPage, initialEmail, initialRole }: Props) {
  const router   = useRouter();
  const pathname = usePathname();

  const [users, setUsers]           = useState<AdminUser[]>(initialData.data);
  const [totalCount, setTotalCount] = useState(initialData.totalCount);
  const [page, setPage]             = useState(initialPage);
  const [email, setEmail]           = useState(initialEmail);
  const [role, setRole]             = useState<UserRole | "">(initialRole);
  const [isFetching, startTrans]    = useTransition();
  const [error, setError]           = useState<string | null>(null);
  const [editUser, setEditUser]     = useState<AdminUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);
  const [promoteUser, setPromoteUser] = useState<AdminUser | null>(null);
  const [isActing, setIsActing]     = useState(false);
  const searchTimeout               = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getApi = useCallback(
    () => AdminUsersAPI(new ApiClient(process.env.NEXT_PUBLIC_API_URL!, token)),
    [token]
  );

  const pushParams = useCallback((params: Record<string, string>) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v) q.set(k, v); });
    router.push(`${pathname}?${q}`);
  }, [router, pathname]);

  const fetchPage = useCallback((
    p: number,
    emailVal: string = email,
    roleVal: UserRole | "" = role,
  ) => {
    startTrans(async () => {
      setError(null);
      const res = await handleAsyncAction(
        getApi().getUsers({ page: p, limit: PAGE_SIZE, email: emailVal, role: roleVal })
      );
      if (res.success) {
        setUsers(res.data.data);
        setTotalCount(res.data.totalCount);
        setPage(p);
        pushParams({ page: String(p), email: emailVal, role: roleVal });
      } else {
        setError(res.message ?? "خطا در دریافت کاربران");
      }
    });
  }, [email, role, getApi, pushParams]);

  const handleEmailChange = useCallback((val: string) => {
    setEmail(val);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => fetchPage(1, val, role), 400);
  }, [fetchPage, role]);

  const handleRoleChange = useCallback((val: UserRole | "") => {
    setRole(val);
    fetchPage(1, email, val);
  }, [fetchPage, email]);

  const handleSaveUser = useCallback(async (payload: UpdateUserPayload) => {
    if (!editUser) return;
    const res = await handleAsyncAction(getApi().updateUser(editUser.id, payload));
    if (res.success) fetchPage(page);
  }, [editUser, page, getApi, fetchPage]);

  const handleDelete = useCallback(async () => {
    if (!deleteUser) return;
    setIsActing(true);
    const res = await handleAsyncAction(getApi().deleteUser(deleteUser.id));
    setIsActing(false);
    setDeleteUser(null);
    if (res.success) fetchPage(page);
  }, [deleteUser, page, getApi, fetchPage]);

  const handlePromote = useCallback(async () => {
    if (!promoteUser) return;
    setIsActing(true);
    const res = await handleAsyncAction(getApi().updateUserRole(promoteUser.id));
    setIsActing(false);
    setPromoteUser(null);
    if (res.success) fetchPage(page);
  }, [promoteUser, page, getApi, fetchPage]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="w-full h-full bg-gray-50 p-3 sm:p-5" dir="rtl">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">

        <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-dashed border-gray-200 flex-wrap">
          <div>
            <h1 className="text-sm font-bold text-gray-800">مدیریت کاربران</h1>
            {totalCount > 0 && (
              <p className="text-xs text-gray-400 mt-0.5">{toPersianDigits(totalCount)} کاربر ثبت شده</p>
            )}
          </div>
          <FilterBar
            email={email}
            role={role}
            onEmailChange={handleEmailChange}
            onRoleChange={handleRoleChange}
          />
        </div>

        {isFetching && (
          <div className="py-14 text-center">
            <div className="inline-block w-5 h-5 border-2 border-green-300 border-t-green-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-400 mt-2">در حال بارگذاری...</p>
          </div>
        )}

        {!isFetching && error && (
          <div className="py-10 text-center">
            <p className="text-sm text-red-400">{error}</p>
            <button onClick={() => fetchPage(page)} className="mt-2 text-xs text-green-500 hover:underline">تلاش مجدد</button>
          </div>
        )}

        {!isFetching && !error && (
          <>
            <div className="hidden md:block overflow-visible">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 rounded-xl">
                    <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500">کاربر</th>
                    <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500">موبایل</th>
                    <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500">نقش</th>
                    <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500">وضعیت ایمیل</th>
                    <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500">تاریخ عضویت</th>
                    <th className="py-3 px-4 w-10" />
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-14 text-center text-sm text-gray-400">کاربری یافت نشد</td>
                    </tr>
                  ) : users.map((u) => (
                    <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar user={u} />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate max-w-[160px]">{u.fullName || "—"}</p>
                            <p className="text-xs text-gray-400 truncate max-w-[160px]" dir="ltr">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap" dir="ltr">{u.phoneNumber || "—"}</td>
                      <td className="py-3 px-4"><RoleBadge role={u.role} /></td>
                      <td className="py-3 px-4"><VerifiedBadge verified={u.emailVerified} /></td>
                      <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">{formatDate(u.createdAt)}</td>
                      <td className="py-3 px-4">
                        <ActionMenu actions={[
                          { label: "ویرایش", icon: "✎", onClick: () => setEditUser(u) },
                          { label: "ارتقا به ادمین", icon: "★", onClick: () => setPromoteUser(u), className: "text-green-600" },
                          { label: "حذف", icon: "✕", onClick: () => setDeleteUser(u), className: "text-red-500" },
                        ]} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3">
              {users.length === 0
                ? <div className="py-14 text-center text-sm text-gray-400">کاربری یافت نشد</div>
                : users.map(u => (
                    <UserCard
                      key={u.id}
                      user={u}
                      onEdit={() => setEditUser(u)}
                      onDelete={() => setDeleteUser(u)}
                      onPromote={() => setPromoteUser(u)}
                    />
                  ))
              }
            </div>

            {totalPages > 1 && (
              <div dir="ltr" className="mt-5 flex flex-row items-center justify-start pt-4 border-t border-gray-100">
                <Pagination current={page} total={totalPages} onChange={p => fetchPage(p)} disabled={isFetching} />
              </div>
            )}
          </>
        )}
      </div>

      {editUser && (
        <EditModal user={editUser} onClose={() => setEditUser(null)} onSave={handleSaveUser} />
      )}
      {deleteUser && (
        <DeleteConfirm user={deleteUser} onConfirm={handleDelete} onCancel={() => setDeleteUser(null)} loading={isActing} />
      )}
      {promoteUser && (
        <PromoteConfirm user={promoteUser} onConfirm={handlePromote} onCancel={() => setPromoteUser(null)} loading={isActing} />
      )}
    </div>
  );
}