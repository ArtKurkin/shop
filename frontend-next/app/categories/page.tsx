import Link from "next/link";
// import styles from "./categories.module.css";
import { ICategory } from "../models/category.model";
import Categories from "../components/categories/Categories";

const getCategories = async () => {
    // const categories = await fetch("http://localhost:5000/categories", {
    //     cache: "no-store",
    // });

    try {
        const categories = await fetch("http://localhost:5000/categories", {
            cache: "no-store",
        });
        return categories.json();
    } catch (e) {
        return [];
    }
}; //вынести в отдельную функцию

export default async function categories() {
    const categories = await getCategories();

    return (
        <>
            <h1 className="pt-4 pb-2">Категории</h1>
            <div>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {categories.map((item: ICategory) => (
                        <div className="col">
                            <Categories item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
