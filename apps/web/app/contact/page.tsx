"use client"
import { StyleSheet } from "@/styles/Stylesheet";


export default function Contact() {
    const styles = createStyles();
    return (
        <>
            <div style={styles.contactContainer}>
                Contact me here:
            </div>
        </>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        contactContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30vh'
        },
    });
}
