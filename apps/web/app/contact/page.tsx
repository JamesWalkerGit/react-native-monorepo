"use client"
import { StyleSheet } from "@/styles/Stylesheet";
import { Button, CopyButton, Text, Transition, useMantineColorScheme } from "@mantine/core";
import Image from 'next/image';
import Link from "next/link";
import linkedinMark from './images/LI-In-Bug.png';
import githubMark from './images/github-mark.svg';
import githubMarkWhite from './images/github-mark-white.svg';
import jprojectsIcon from './images/Jprojects-Icon.png';
import { useEffect, useState } from "react";



export default function Contact() {
    const styles = createStyles();
    const { colorScheme } = useMantineColorScheme({ keepTransitions: true });
    const [githubMarkSrc, setGithubMarkSrc] = useState(githubMark);
    const [loadIcons, setLoadIcons] = useState(false);

    useEffect(() => {
        setGithubMarkSrc(colorScheme === 'light' ? githubMark : githubMarkWhite);
    }, [colorScheme]);

    useEffect(() => {
        setInterval(() => {
            loadIcons === false ? setLoadIcons(true) : null
        }, 50)
    }, [loadIcons]);

    return (
        <>
            <div style={styles.contactTextContainer}>
                <Text style={{ fontSize: 36 }}>
                    Contact
                </Text>
            </div>
            <div style={styles.contactContainer}>
                <Transition
                    mounted={loadIcons}
                    transition='slide-down'
                    duration={200}
                    timingFunction="ease"
                >
                    {
                        (fadeStyle) => {
                            return <div style={{ ...fadeStyle }}>
                                <div style={styles.linkedinContainer}>
                                    <Link target="_blank" href={"http://linkedin.com/in/jameswalkerlinkedin"} aria-label="http://linkedin.com/in/jameswalkerlinkedin" style={styles.contactLink}>
                                        <Text style={styles.contactText}>Linkedin</Text>
                                        <Image src={linkedinMark} alt={"linkedinLogo"} width={125}></Image>
                                    </Link>
                                </div>

                                <div style={styles.githubContainer}>
                                    <Link target="_blank" href={"https://github.com/JamesWalkerGit"} aria-label="https://github.com/JamesWalkerGit" style={styles.contactLink}>
                                        <Text style={styles.contactText}>GitHub</Text>
                                        <Image src={githubMarkSrc} alt={"githubIcon"} width={125}></Image>
                                    </Link>
                                </div>

                                <div style={styles.emailContainer}>
                                    <Link target="_blank" href={'mailto:JProjectsMail@gmail.com'} aria-label="Mail To JProjectsmail@gmail.com" style={styles.contactLink}>
                                        <Text style={styles.contactText}>Email</Text>
                                        <Button variant='transparent' style={{ width: 125, height: 150 }}>
                                            <div style={styles.jprojectsIconContainer}>
                                                <Image src={jprojectsIcon} alt={"JProjects"} ></Image>
                                            </div>
                                        </Button>
                                    </Link>
                                    <div style={styles.copyButtonContainer}>
                                        <CopyButton value="JProjectsMail@gmail.com">
                                            {({ copied, copy }) => (
                                                <Button variant="outline" color={copied ? 'teal' : 'blue'} onClick={copy} style={styles.copyButton} aria-label="JprojectsMail@gmail.com">
                                                    {copied ? 'Copied' : 'JProjectsMail@gmail.com'}
                                                </Button>
                                            )}
                                        </CopyButton>
                                    </div>
                                </div>
                            </div>
                        }
                    }
                </Transition >
            </div >
        </>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        contactContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        linkedinContainer: {
            display: 'flex',
            flexDirection: 'row',
            margin: 40
        },
        githubContainer: {
            margin: 40,
            flexDirection: 'row'
        },
        emailContainer: {
            margin: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        emailLink: {
            fontSize: 24,
        },
        contactLink: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        contactText: {
            fontSize: 32,
            marginRight: 40
        },
        contactTextContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        jprojectsIconContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        copyButton: {
            marginLeft: 108
        },
        copyButtonContainer: {
            marginTop: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    });
}
