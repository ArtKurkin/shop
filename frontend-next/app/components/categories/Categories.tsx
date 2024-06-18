import Link from "next/link";
import { ICategory } from "@/app/models/category.model";
import { checkImage } from "@/app/services/checkImage";
import styles from "../products/product.module.css";

export default async function Categories(props: { item: ICategory }) {
    let image = await checkImage(
        `http://localhost:5000/${props.item.image}`,
        "http://dummyimage.com/640"
    );
    return (
        <div key={props.item.id} className="card h-100">
            <Link href={`/categories/${props.item.translit}`}>
                <div className={styles.image_container}>
                    <img src={image} className="card-img-top" />
                </div>

                <div className="card-body">
                    <h5 className="card-title">{props.item.title}</h5>
                    <p className="card-text">{props.item.description}</p>
                </div>
            </Link>
        </div>
    );
}
