import Link from "next/link";
import React from "react";

export default function DownloadBtn() {
    return (
        <Link href="http://localhost:5000/products/download">
            Список всех товаров
        </Link>
    );
}
