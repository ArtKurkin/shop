import { getCookies, isAuth } from "@/actions/ServerActions";
import Item from "@/app/components/dashboard/Item";
import { ICategory } from "@/app/models/category.model";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { revalidatePath, revalidateTag } from "next/cache";
import DownloadBtn from "@/app/components/DownloadBtn";

const getCategories = async (): Promise<[]> => {
    const categories = await fetch("http://localhost:5000/categories", {
        cache: "no-store",
    });

    return categories.json();
};

export default async function page() {
    await isAuth();
    const categories = await getCategories();
    const downLoad = async () => {
        "use server";
        // await fetch("http://localhost:5000/products/download", {
        //     method: "GET",
        // });
        await isAuth().then(res => {
            if (res) {
                redirect("http://localhost:5000/products/download");
            }
        });
    };

    return (
        <>
            <h1 className="pt-4 pb-2">Категории</h1>

            <form action={downLoad}>
                <button type="submit" className="btn btn-success mb-2">
                    Скачать{" "}
                </button>
            </form>

            <ul className="list-group">
                {categories.map((item: ICategory) => (
                    <Item
                        item={item}
                        link={`/dashboard/items/${item.translit}`}
                        linkEdit={`/dashboard/items/add-categories/main?name=${item.translit}`}
                        type={"category"}
                        parentSlug={""}
                    />
                ))}
            </ul>
            <Link
                className="btn btn-primary mt-4"
                href="/dashboard/items/add-categories/main"
            >
                Доавить категорию
            </Link>
        </>
    );
}
