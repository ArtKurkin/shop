import React from "react";
import styles from "./product.module.css";
import Slider from "@/app/components/products/Slider";
import { get } from "http";
import { checkImage } from "@/app/services/checkImage";
import AddInCart from "@/app/components/products/AddInCart";

const getProduct = async (params: any) => {
  let product;
  try {
    product = await fetch(`http://localhost:5000/products/${params.slug}`, {
      cache: "no-store",
    });
  } catch (e) {
    
  }

  if (product) {
    return await product.json();
  }
};

export default async function ProductPage({ params }: { params: any }) {
  const product = await getProduct(params);

  let image = await checkImage(
    `http://localhost:5000/${product.image}`,
    "http://dummyimage.com/640"
  );
  return (
    <>
      <br />
      <br />
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div style={{ aspectRatio: "1/1", overflow: "hidden" }}>
            {/* <Slider image={image} /> */}
            <img
              src={image}
              alt=""
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <h4 className="card-text">{product.price} ₽</h4>
              <p
                style={{
                  maxHeight: "300px",
                  overflow: "hidden",
                }}
              >
                {product.description}
              </p>
              <p className="card-text">Количество: {product.quantity}</p>

              <AddInCart idProduct={product.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
