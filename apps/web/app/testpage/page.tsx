"use client";


import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function TestPage() {
    const router = useRouter()

    const goBack = () => {
        router.push('/')
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            Hey im test page 1 😀
            <Button onClick={goBack}>Home</Button>
        </div>
    );
}
