"use client";

import Link from 'next/link';
import { StyleSheet } from "@/styles/Stylesheet";
import { Button, Text } from '@mantine/core';
import HappySquare from '@/app/components/animations/HappySquare';

export default function OAuthErrorPage() {
    const styles = createStyles();

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.happySquareContainer}>
                    <HappySquare />
                </div>
                <Text style={{ fontFamily: 'Tahoma', fontSize: 48 }}>
                    OAuth Login Error
                </Text>
                <Text>
                    Perhaps some account setting denied authorization 😢
                </Text>

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
            marginTop: 64
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
        happySquareContainer: {
            height: 300,
            width: 300
        }
    });
};
