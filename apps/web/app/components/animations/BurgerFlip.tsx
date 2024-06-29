"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { StyleSheet } from "@/styles/Stylesheet"
import { LottieComponentProps } from '@/types/types';


const burgerFlipPath = '../../../animations/lottie/burgerFlip.lottie'

export default function BurgerFlip({ height = 300, width = 300, speed = 1, ...props }: LottieComponentProps) {
    const styles = createStyles({ height, width });

    return (
        <>
            <div style={{ ...styles.burgerFlip }} {...props}>
                <DotLottieReact
                    src={burgerFlipPath}
                    loop
                    autoplay
                    autoResizeCanvas={true}
                    speed={speed}
                />
            </div>
        </>
    );
}

const createStyles = ({ height, width }: { height: number, width: number }) => {
    return StyleSheet.create({
        burgerFlip: {
            height: height,
            width: width
        }
    });
}