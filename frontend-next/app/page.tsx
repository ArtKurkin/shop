import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className="container-sm">
            <h2 className="pt-4">Главная</h2>
            <p>
                Добро пожаловать в наш интернет-магазин модной одежды! У нас вы
                найдете широкий выбор стильной и качественной одежды для женщин,
                мужчин и детей. Мы предлагаем модели различных размеров, цветов
                и стилей, чтобы каждый наш клиент мог найти что-то по своему
                вкусу. Наша коллекция включает в себя платья, футболки, рубашки,
                брюки, джинсы, куртки, пальто и многое другое. Мы следим за
                последними тенденциями моды, поэтому у нас вы всегда найдете
                актуальные модели. Мы гарантируем высокое качество нашей одежды
                и быструю доставку по всей стране. Не упустите возможность
                обновить свой гардероб с помощью наших модных и стильных вещей!
            </p>
        </div>
    );
}