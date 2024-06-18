import React from "react";
// import styles from "../categories.module.css";
import Link from "next/link";
import { ICategory } from "@/app/models/category.model";
import { IProduct } from "@/app/models/product.model";
import Products from "@/app/components/products/Products";
import Categories from "@/app/components/categories/Categories";

const getItems = async (slug: string): Promise<{ item: string; arr: any }> => {
    const categories = await fetch(`http://localhost:5000/categories/${slug}`, {
        cache: "no-store",
    });
    const res = await categories.json();
    if (res?.it?.length) {
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

export default async function page({
    params,
    searchParams,
}: {
    params: any;
    searchParams: any;
}) {
    const items = await getItems(params.slug);

    if (!items.arr.it.length) {
        return <h2 className="pt-4 pb-2">Тут пока ничего нет</h2>;
    }

    //Проверка сортировки
    if (searchParams.sort == "up") {
        items.arr.it.sort((a: any, b: any) => a.price - b.price);
    }
    if (searchParams.sort == "down") {
        items.arr.it.sort((a: any, b: any) => b.price - a.price);
    }

    if (items.item == "category") {
        return (
            <>
                <h1 className="pt-4 pb-2">Категории {items.arr.title}</h1>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {items.arr.it.map((item: ICategory) => (
                        <div className="col">
                            <Categories item={item} />
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="pt-4 pb-2">Товары {items.arr.title}</h1>
            <div
                className="btn-group"
                role="group"
                aria-label="Basic outlined example"
            >
                <Link
                    href={`/categories/${params.slug}?sort=down`}
                    type="button"
                    className={
                        searchParams.sort == "down"
                            ? "btn btn-primary"
                            : "btn btn-outline-primary"
                    }
                >
                    По убыванию
                </Link>
                <Link
                    href={`/categories/${params.slug}?sort=up`}
                    type="button"
                    className={
                        searchParams.sort == "up"
                            ? "btn btn-primary"
                            : "btn btn-outline-primary"
                    }
                >
                    По возрастанию
                </Link>
            </div>
            <br />
            <br />

            <div className="row row-cols-1 row-cols-md-4 g-4">
                {items.arr.it.map((item: IProduct) => {
                    if (item.quantity > 0) {
                        return (
                            <div className="col">
                                <Products item={item} />
                            </div>
                        );
                    }
                })}
            </div>
        </>
    );
}
