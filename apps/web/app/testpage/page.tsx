"use client";

import { Button } from "@repo/ui";

import styles from "../../styles/index.module.css";
import { useRouter } from "next/navigation";

export default function TestPage() {

    const router = useRouter()


    const goBack = () => {
        router.push('/')
    }

    return (
        <div className={styles.container}>
            Hey im test page 1 😀
            <Button onClick={goBack} text="Home " />
        </div>
    );
}
