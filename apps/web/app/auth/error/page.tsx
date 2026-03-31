"use client";

import Link from 'next/link';
import { useState } from 'react';
import { StyleSheet } from "@/styles/Stylesheet";
import { Button, Text } from '@mantine/core';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const owlPath = '/animations/lottie/owl.lottie'
const owlColor = '#7375f0'

export default function OAuthErrorPage() {
    const [dotLottie, setDotLottie] = useState<any>(null);
    const styles = createStyles();

    const dotLottieRefCallback = (dotLottie: any) => {
        setDotLottie(dotLottie);
    };

    const play = () => {
        if (dotLottie) {
            dotLottie.play();
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Text style={{ fontFamily: 'Tahoma', fontSize: 48 }}>
                    OAuth Login Error
                </Text>
                <Text>
                    Perhaps some account setting denied authorization 😢
                </Text>

                <Text style={styles.owlMessageText}>
                    The Owl is sad you got an error, but if you press the button you'll make him feel better
                </Text>

                <div style={styles.owlContainer}>
                    <DotLottieReact
                        src={owlPath}
                        autoplay={false}
                        loop={false}
                        dotLottieRefCallback={dotLottieRefCallback}
                    />
                </div>

                <Button color={owlColor} onClick={() => play()} style={styles.owlButton} variant='outline'>Press Button</Button>

                <div style={styles.buttonContainer}>
                    <Link href="/">
                        <Button variant={'gradient'} gradient={{ from: 'pink', to: 'violet', deg: 167 }}>Return Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            display: 'flex',
            height: '90vh',
            width: '100%'
        },
        header: {
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
        },
        buttonContainer: {
            marginTop: 80
        },
        errorContextContainer: {
            marginTop: 16,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#e9ecef',
            borderRadius: 8,
            padding: 12,
            width: '80%',
            maxWidth: 560
        },
        owlContainer: {
            height: 200,
            width: 240,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 8
        },
        owlButton: {
            marginTop: 8
        },
        owlMessageText: {
            marginTop: 48,
            maxWidth: 540,
            textAlign: 'center'
        }
    });
};
