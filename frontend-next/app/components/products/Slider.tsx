"use client";

import React, { useEffect } from "react";

export default function Slider() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            require("bootstrap/dist/js/bootstrap.js");
        }
    }, []);

    return;
}
