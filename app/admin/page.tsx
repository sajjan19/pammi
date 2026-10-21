import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin, isAdminConfigured } from "@/lib/auth";
import { getStatus, orderStatuses, statusValues, type OrderStatus } from "@/lib/content";
import { listOrders, statusCounts } from "@/lib/orders";
import { LoginForm } from "./login-form";
import { logout } from "./actions";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

// Orders change as she works through them, so this page is always rendered
// fresh rather than served from the build.
export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  if (!(await isAdmin())) {
    return (
      <div className="container-narrow" style={{ maxWidth: "460px" }}>
        <div className={styles.wrap}>
          <LoginForm configured={isAdminConfigured()} />
        </div>
      </div>
    );
  }

  const { status: requested } = await searchParams;
  const filter: OrderStatus | "all" = statusValues.includes(
    requested as OrderStatus,
  )
    ? (requested as OrderStatus)
    : "all";

  const [orders, counts] = await Promise.all([
    listOrders(filter),
    statusCounts(),
  ]);
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

  return (
    <div className="container">
      <div className={styles.wrap}>
        <div className={styles.top}>
          <h1 className={styles.title}>Orders</h1>
          <form action={logout}>
            <button className="btn btn-ghost btn-sm" type="submit">
              Sign out
            </button>
          </form>
        </div>

        <div className={styles.filters}>
          <Link
            href="/admin"
            className={`${styles.filter} ${
              filter === "all" ? styles.filterActive : ""
            }`}
          >
            All <span className={styles.count}>{total}</span>
          </Link>
          {orderStatuses.map((status) => (
            <Link
              key={status.value}
              href={`/admin?status=${status.value}`}
              className={`${styles.filter} ${
                filter === status.value ? styles.filterActive : ""
              }`}
            >
              {status.label}{" "}
              <span className={styles.count}>{counts[status.value] ?? 0}</span>
            </Link>
          ))}
        </div>

        {orders.length === 0 ? (
          <p className={styles.empty}>
            {total === 0
              ? "No orders yet. They'll appear here as they come in."
              : "Nothing in this list right now."}
          </p>
        ) : (
          <div className={styles.list}>
            {orders.map((order) => {
              const status = getStatus(order.status);
              return (
                <Link
                  key={order.id}
                  href={`/admin/${order.id}`}
                  className={styles.row}
                >
                  <span className={styles.reference}>{order.reference}</span>
                  <span className={styles.who}>
                    <span className={styles.whoName}>
                      {order.customer_name}
                    </span>
                    <span className={styles.whoWhat}>
                      {order.quantity > 1 && `${order.quantity} × `}
                      {order.garment_name}
                      {order.photos.length > 0 &&
                        ` · ${order.photos.length} photo${
                          order.photos.length > 1 ? "s" : ""
                        }`}
                    </span>
                  </span>
                  <span className={styles.when}>
                    {formatDate(order.created_at)}
                  </span>
                  <span className={`badge badge-${status.tone}`}>
                    {status.label}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
