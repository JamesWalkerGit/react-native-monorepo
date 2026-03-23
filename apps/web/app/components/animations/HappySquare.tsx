"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { StyleSheet } from "@/styles/Stylesheet"
import { LottieComponentProps } from '@/types/types';

const happySquarePath = '../../../animations/lottie/happySquare.lottie'

export default function HappySquare({ height = 300, width = 300, speed = 1, ...props }: LottieComponentProps) {
    const styles = createStyles({ height, width });

    return (
        <>
            <div style={{ ...styles.happySquare }} {...props}>
                <DotLottieReact
                    src={happySquarePath}
                    loop
                    autoplay
                    speed={speed}
                />
            </div>
        </>
    );
}

const createStyles = ({ height, width }: { height: number, width: number }) => {
    return StyleSheet.create({
        happySquare: {
            height: height,
            width: width
        }
    });
}