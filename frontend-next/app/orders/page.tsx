import { getOrders, isAuth } from "@/actions/ServerActions";
import React from "react";

export default async function page() {
  await isAuth();
  const orders = await getOrders();

  return (
    <div className="container-sm">
      <h1 className="pt-4 pb-2">Заказы</h1>

      {orders.map((item: any) => (
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between gap-4">
              <h3>Заказ номер {item.id}</h3>
              <p>Дата заказа: {item.createdAt.split("T")[0]}</p>
            </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">№</th>
                  <th scope="col">Название</th>
                  <th scope="col">Цена, руб.</th>
                  <th scope="col">Количество, шт.</th>
                </tr>
              </thead>
              <tbody>
                {item.products.map((item: any, index: any, arr: any) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.title}</td>
                    <td>{item.ProductOrders.price}</td>
                    <td>{item.ProductOrders.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4>
              Итого:{" "}
              {item?.products?.reduce(
                (sum: number, item: any) =>
                  sum + item.ProductOrders.price * item.ProductOrders.quantity,
                0
              )}{" "}
              руб.
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
