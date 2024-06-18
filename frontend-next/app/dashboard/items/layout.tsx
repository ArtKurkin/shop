import Link from "next/link";
import React, { Suspense } from "react";
export default function layoutDash({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-md">
      <br />
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            href="/dashboard/items"
          >
            Товары и категории
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            Заказы
          </Link>
        </li>
      </ul>
      {children}
    </div>
  );
}
