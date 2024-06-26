"use client";

import { useEffect, useState } from "react";
import { Transition, } from "@mantine/core";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const partyParrotPath = '../../../animations/lottie/partyParrot.lottie'
export default function PartyParrot() {
    const [loadLottie, setLoadLottie] = useState(false);

    useEffect(() => {
        setInterval(() => {
            loadLottie === false ? setLoadLottie(true) : null
        }, 200)
    }, [loadLottie]);

    return (
        <>
            {loadLottie ? null : <div style={{ height: '300px' }}></div>}
            <Transition
                mounted={loadLottie}
                transition='skew-up'
                duration={400}
                timingFunction="ease"
            >
                {(fadeStyle) => {
                    return <div style={{ ...fadeStyle, ...{ height: 300 } }}>
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
