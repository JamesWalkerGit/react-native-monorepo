"use client";

import { useEffect, useState } from "react";
import { Transition, } from "@mantine/core";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { StyleSheet } from "@/styles/Stylesheet"

const partyParrotPath = '../../../animations/lottie/partyParrot.lottie'

export default function PartyParrot() {
    const styles = createStyles();
    const [loadLottie, setLoadLottie] = useState(false);

    useEffect(() => {
        setInterval(() => {
            loadLottie === false ? setLoadLottie(true) : null
        }, 5)
    }, [loadLottie]);

    return (
        <>
            {loadLottie ? null :
                <div style={styles.loadingContainer}></div>
            }
            <Transition
                mounted={loadLottie}
                transition='fade'
                duration={400}
                timingFunction={'ease'}
            >
                {(fadeStyle) => {
                    return <div style={{ ...fadeStyle, ...styles.partyParrot }}>
                        <DotLottieReact
                            src={partyParrotPath}
                            loop
                            autoplay
                            autoResizeCanvas={true}
                        />
                    </div>
                }
                }
            </Transition>
        </>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        loadingContainer: {
            height: 400
        },
        partyParrot: {
            height: 400
        }
    });
}