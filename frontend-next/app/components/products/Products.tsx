import { IProduct } from "@/app/models/product.model";
import Link from "next/link";
import styles from "./product.module.css";
import { checkImage } from "@/app/services/checkImage";

export default async function Products(props: { item: IProduct }) {
    let image = await checkImage(
        `http://localhost:5000/${props.item.image}`,
        "http://dummyimage.com/640"
    );
    return (
        <div key={props.item.id} className="card h-100">
            <Link href={`/products/${props.item.translit}`}>
                <div className={styles.image_container}>
                    <img src={image} className="card-img-top" />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.item.title}</h5>
                    <p className="card-text">{props.item.description}</p>
                    <p>{props.item.price} ₽</p>
                </div>
            </Link>
        </div>
    );
}
