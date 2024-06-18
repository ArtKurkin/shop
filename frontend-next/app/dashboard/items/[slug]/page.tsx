import { isAuth } from "@/actions/ServerActions";
import Item from "@/app/components/dashboard/Item";
import { ICategory } from "@/app/models/category.model";
import Link from "next/link";
import React from "react";

const getItems = async (
    slug: string
): Promise<{ item: string; arr: { it: [] } }> => {
    const categories = await fetch(`http://localhost:5000/categories/${slug}`, {
        cache: "no-store",
    });
    const res = await categories.json();
    if (res.it.length) {
        return { item: "category", arr: res };
    }

    const product = await fetch(
        `http://localhost:5000/products?category=${slug}`,
        {
            cache: "no-store",
        }
    );

    const asd = await product.json();

    return { item: "product", arr: asd };
};

export default async function pageItems({ params }: { params: any }) {
    await isAuth();
    const items = (await getItems(params.slug)) as any;

    if (!items.arr.it.length) {
        return (
            <>
                <h1 className="pt-4 pb-2">
                    {items.item == "category"
                        ? `Категории ${items.arr.title}`
                        : `Товары ${items.arr.title}`}
                </h1>
                <Link
                    className="btn btn-primary mt-2 me-2"
                    href={`/dashboard/items/add-categories/${params.slug}`}
                >
                    Доавить категорию
                </Link>
                <Link
                    className="btn btn-primary mt-2"
                    href={`/dashboard/items/add-product/${params.slug}`}
                >
                    Доавить товар
                </Link>
            </>
        );
    }

    return (
        <>
            <h1 className="pt-4 pb-2">
                {items.item == "category"
                    ? `Категории ${items.arr.title}`
                    : `Товары ${items.arr.title}`}
            </h1>
            <ul className="list-group">
                {items.arr.it.map((item: ICategory) => (
                    <Item
                        item={item}
                        link={
                            items.item == "category"
                                ? `/dashboard/items/${item.translit}`
                                : `/products/${item.translit}`
                        }
                        linkEdit={
                            items.item == "category"
                                ? `/dashboard/items/add-categories/${params.slug}?name=${item.translit}`
                                : `/dashboard/items/add-product/${params.slug}?name=${item.translit}`
                        }
                        parentSlug={params.slug}
                        type={items.item}
                    />
                ))}
            </ul>
            {items.item == "category" ? (
                <Link
                    className="btn btn-primary mt-4 me-4"
                    href={`/dashboard/items/add-categories/${params.slug}`}
                >
                    Доавить категорию
                </Link>
            ) : (
                <Link
                    className="btn btn-primary mt-4"
                    href={`/dashboard/items/add-product/${params.slug}`}
                >
                    Доавить товар
                </Link>
            )}
        </>
    );
}
