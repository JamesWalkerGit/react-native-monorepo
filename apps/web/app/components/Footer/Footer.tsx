"use client";
import { StyleSheet } from "@/styles/Stylesheet";
import classes from './Footer.module.css';
import styleConsts from '@/styles/styleConsts.module.css'
import { Button, Transition, Text } from '@mantine/core';
import { GithubIcon } from "../icons/GithubIcon";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useMediaQuery } from "@mantine/hooks";

const partyParrotPath = '../animations/lottie/partyParrot.lottie'
export const ButtonPartyParrot = () => {
    return (
        <DotLottieReact
            src={partyParrotPath}
            loop
            autoplay
            autoResizeCanvas={true}
            speed={1}
        />
    )
}
export default function Footer() {
    const styles = createStyles();
    const [loadFooter, setLoadFooter] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setInterval(() => {
            loadFooter === false ? setLoadFooter(true) : null
        }, 200)
    }, [loadFooter]);

    const isInMobileView = useMediaQuery('(max-width: 36em)', true);



    return (
        <>
            <div style={styles.footerContainer} className={classes.footerContainer + ' ' + styleConsts.transitionThemeColors}>

                <Transition
                    mounted={loadFooter}
                    transition='fade'
                    duration={300}
                    timingFunction="ease"
                >
                    {
                        (fadeStyle) => <div style={{
                            ...fadeStyle, ...styles.footerContainer
                        }}>
                            <div style={{ ...styles.footerSection, flex: .8 }}>
                                <a target="#blank"
                                    href="https://github.com/JamesWalkerGit/react-native-monorepo/tree/main/apps/web"
                                    style={{ display: 'flex', flexDirection: 'row' }}
                                    className={classes.footerGithubLink}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <GithubIcon width={25} />
                                    </div>
                                </a>
                            </div>

                            <div style={{ ...styles.footerSection, flex: .2, justifyContent: 'flex-end' }}>
                                <Link href={pathname === '/contact' ? '/' : '/contact'}
                                >
                                    <Button variant='outline' style={styles.footerButton}>
                                        {pathname === '/contact' ?
                                            <>
                                                ←
                                                <div style={styles.footerParrotContainer}>
                                                    <ButtonPartyParrot />
                                                </div>
                                            </>
                                            : 'Contact'}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    }
                </Transition>
            </div>
        </>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        footerContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
            zIndex: 11,
            position: 'fixed',
            bottom: 0,
            width: '100%',
        },
        footerSection: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 24,
            paddingRight: 24
        },
        footerParrotContainer: {
            height: 35,
            width: 35,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 8
        },
        footerButton: {
            width: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center '
        }
    });
}
