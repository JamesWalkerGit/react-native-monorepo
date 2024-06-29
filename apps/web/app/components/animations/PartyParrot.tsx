"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { StyleSheet } from "@/styles/Stylesheet"
import { LottieComponentProps } from '@/types/types';

const partyParrotPath = '../../../animations/lottie/partyParrot.lottie'

export default function PartyParrot({ height = 300, width = 300, speed = 1, ...props }: LottieComponentProps) {
    const styles = createStyles({ height, width });

    return (
        <>
            <div style={{ ...styles.partyParrot }} {...props}>
                <DotLottieReact
                    src={partyParrotPath}
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
        partyParrot: {
            height: height,
            width: width
        }
    });
}