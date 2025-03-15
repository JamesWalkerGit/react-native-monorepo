"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { StyleSheet } from "@/styles/Stylesheet"
import { LottieComponentProps } from '@/types/types';
import BurgerFlip from './BurgerFlip';
import { useEffect, useState } from 'react';

const partyParrotPath = '../../../animations/lottie/partyParrot.lottie'

export default function PartyParrot({ height = 250, width = 250, speed = 1, ...props }: LottieComponentProps) {
    const styles = createStyles({ height, width });
    const [isLoadingParrot, setIsLoadingParrot] = useState(true);

    useEffect(() => {
        setInterval(() => {
            setIsLoadingParrot(false)
        }, 750)
    }, [])

    return (
        <>
            <div style={{ ...styles.partyParrot }} {...props}>
                {isLoadingParrot ?
                    <BurgerFlip height={160} width={160} speed={2.25} aria-label="Loading Parrot Spinner" />
                    : <DotLottieReact
                        src={partyParrotPath}
                        loop
                        autoplay
                        autoResizeCanvas={true}
                        speed={speed}
                    />}
            </div>
        </>
    );
}

const createStyles = ({ height, width }: { height: number, width: number }) => {
    return StyleSheet.create({
        partyParrot: {
            height: height,
            width: width,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    });
}