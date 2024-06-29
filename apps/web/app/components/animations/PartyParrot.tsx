"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { StyleSheet } from "@/styles/Stylesheet"

const partyParrotPath = '../../../animations/lottie/partyParrot.lottie'

export default function PartyParrot() {
    const styles = createStyles();

    return (
        <>
            <div style={{ ...styles.partyParrot }} aria-label='Party Parrot 🦜'>
                <DotLottieReact
                    src={partyParrotPath}
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
        partyParrot: {
            height: 300,
            width: 300
        }
    });
}