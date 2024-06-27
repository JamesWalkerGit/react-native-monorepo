"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { StyleSheet } from "@/styles/Stylesheet"

const happySquarePath = '../../../animations/lottie/happySquare.lottie'

export default function HappySquare() {
    const styles = createStyles();

    return (
        <>
            <div style={{ ...styles.happySquare }}>
                <DotLottieReact
                    src={happySquarePath}
                    loop
                    autoplay
                    autoResizeCanvas={true}
                />
            </div>
        </>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        happySquare: {
            height: 300,
            width: 300
        }
    });
}