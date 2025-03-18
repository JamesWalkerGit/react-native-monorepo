"use client"
import { StyleSheet } from "@/styles/Stylesheet";
import { Button, CopyButton, Text, Transition, useMantineColorScheme } from "@mantine/core";
import Image from 'next/image';
import Link from "next/link";
import linkedinMark from '../images/LI-In-Bug.png';
import githubMark from '../images/github-mark.svg';
import githubMarkWhite from '../images/github-mark-white.svg';
import jprojectsIcon from '../images/Jprojects-Icon.png';
import { useEffect, useState } from "react";
import classes from './styles/Contact.module.css';
import { StaticImport } from "next/dist/shared/lib/get-img-props";




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



    const ContactContainer = ({ link, text, ariaLabel, image, imageAlt }: { link: string, text: string, ariaLabel: string, image: string | StaticImport, imageAlt: string }) => {
        return (
            <>
                <Link target="_blank" href={link} aria-label={ariaLabel} style={styles.contactLink}>
                    <div style={styles.contactContainer} className={classes.contactContainer}>
                        <div style={styles.contactTextContainer}>
                            <Text style={styles.contactText}>{text}</Text>
                        </div>
                        <div style={styles.contactIconContainer}>
                            <Image src={image} alt={imageAlt} priority={true}></Image>
                        </div>
                    </div>
                </Link>
            </>
        )
    }

    return (
        <>
            <div style={styles.contactTitleContainer}>
                <Text style={{ fontSize: 36 }}>
                    Contact
                </Text>
            </div>
            <div>
                <Transition
                    mounted={loadIcons}
                    transition='slide-down'
                    duration={200}
                    timingFunction="ease"
                >
                    {
                        (fadeStyle) => {
                            return <div style={{ ...fadeStyle }}>
                                <ContactContainer link={"http://linkedin.com/in/jameswalkerlinkedin"} text={"Linkedin"} ariaLabel={"http://linkedin.com/in/jameswalkerlinkedin"} image={linkedinMark} imageAlt={"linkedinLogo"} />

                                <ContactContainer link={"https://github.com/JamesWalkerGit"} text={"GitHub"} ariaLabel={"https://github.com/JamesWalkerGit"} image={githubMarkSrc} imageAlt={"githubIcon"} />

                                <ContactContainer link={"mailto:JProjectsMail@gmail.com"} text={"Email"} ariaLabel={"Mail To JProjectsmail@gmail.com"} image={jprojectsIcon} imageAlt={"JProjects"} />

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
            width: 300
        },
        contactLink: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        contactTitleContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        contactText: {
            fontSize: 32,
        },
        contactTextContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginRight: 40,
            width: 100,
        },
        contactIconContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 100
        },
        copyButton: {
        },
        copyButtonContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 24
        }
    });
}
