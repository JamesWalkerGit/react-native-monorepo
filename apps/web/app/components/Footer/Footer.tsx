"use client";
import { StyleSheet } from "@/styles/Stylesheet";
import classes from './Footer.module.css';
import { showInMobileView } from "@/styles/consts";
import styleConsts from '@/styles/styleConsts.module.css'
import { Button, Transition } from '@mantine/core';
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

    console.log('-----pathname: ', pathname);

    useEffect(() => {
        setInterval(() => {
            loadFooter === false ? setLoadFooter(true) : null
        }, 50)
    }, [loadFooter]);

    const isInMobileView = useMediaQuery('(max-width: 36em)', true);



    return (
        <>

            <Transition
                mounted={loadFooter}
                transition='slide-up'
                duration={200}
                timingFunction="ease"
                enterDelay={1250}
            >
                {
                    (fadeStyle) => {
                        return <div style={{
                            ...fadeStyle, ...styles.footerTransition
                        }}>
                            <div style={styles.footerContainer} className={classes.footerContainer + ' ' + styleConsts.transitionThemeColors}>
                                <div style={{ ...styles.footerSection, flex: .8 }}>

                                    <a target="#blank"
                                        href="https://github.com/JamesWalkerGit/react-native-monorepo/tree/main/apps/web"
                                        style={{ display: 'flex', flexDirection: 'row' }}
                                        className={classes.footerGithubLink}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <GithubIcon height={25} width={25} style={{ marginRight: 8 }} /> Github
                                        </div>
                                    </a>
                                </div>

                                {isInMobileView ? <div style={{ ...styles.footerSection, flex: .2, justifyContent: 'flex-end' }}>
                                    <Link href={pathname === '/contact' ? '/' : '/contact'}
                                    >
                                        <Button variant='outline'>
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
                                </div> : null}

                            </div>
                        </div>

                    }
                }
            </Transition >

        </>
    );
}

const createStyles = () => {
    return StyleSheet.create({
        footerTransition: {
            position: 'fixed',
            bottom: 0,
            width: '100%',
        },
        footerContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
            zIndex: 11,
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
    });
}
