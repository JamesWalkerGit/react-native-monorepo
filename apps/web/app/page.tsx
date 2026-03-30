"use client";

import Confetti from 'react-confetti'
import { useEffect, useState } from "react";
import { StyleSheet } from "@/styles/Stylesheet"
import { useSession } from "next-auth/react"
import { Button, Modal, Transition, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery, useViewportSize } from "@mantine/hooks";
import PartyParrot from './components/animations/PartyParrot';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useBottomSheet } from './contexts/BottomSheetContext';
import Portfolio from './components/portfolio/Portfolio';

const owlPath = '../../../animations/lottie/owl.lottie'
const owlColor = '#7375f0'

export default function Homepage() {
  const [confettiStatus, setConfettiStatus] = useState(false);
  const [openedModal, { open: openModal, close }] = useDisclosure(false);
  const [loadButtons, setLoadButtons] = useState(false);
  const [showBottomPeekTrigger, setShowBottomPeekTrigger] = useState(false);
  const [dotLottie, setDotLottie] = useState<any>(null);
  const session = useSession();
  const isMobileLayout = useMediaQuery('(max-width: 48em)');
  const isTouchPrimaryInput = useMediaQuery('(hover: none) and (pointer: coarse)');
  const { height, width } = useViewportSize();
  const styles = createStyles();
  const bottomSheet = useBottomSheet();

  const dotLottieRefCallback = (dotLottie: any) => {
    setDotLottie(dotLottie);
  };

  const play = () => {
    if (dotLottie) {
      dotLottie.play();
    }
  }

  const toggleConfetti = () => {
    setConfettiStatus(!confettiStatus)
  }

  useEffect(() => {
    setInterval(() => {
      loadButtons === false ? setLoadButtons(true) : null
    }, 200)
  }, [loadButtons]);

  useEffect(() => {
    const isAtPageBottom = () => {
      if (typeof window === 'undefined') {
        return false;
      }

      const pageHeight = document.documentElement.scrollHeight;
      return window.innerHeight + window.scrollY >= pageHeight - 2;
    };

    const handleScroll = () => {
      setShowBottomPeekTrigger(isAtPageBottom());
    };

    const handleResize = () => {
      setShowBottomPeekTrigger(isAtPageBottom());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div style={styles.container}>
        <Transition
          mounted={confettiStatus}
          transition='fade-down'
          duration={400}
          timingFunction="ease"
        >
          {(fadeStyle) => {
            return <>
              <Confetti style={{ ...fadeStyle, ...styles.confettiOverlay }} height={height} width={width} numberOfPieces={200} initialVelocityY={-40}
                aria-label="confetti-party"
              />
            </>
          }
          }
        </Transition>
        <>
          <div style={styles.partyContainer}>
            <div style={styles.partyParrotContainer}>
              <PartyParrot />
            </div>
            <Button onClick={toggleConfetti} style={styles.partyButton} variant={'gradient'} gradient={{ from: 'pink', to: 'violet', deg: 167 }}>
              Party Button 🎉
            </Button>

            <Modal opened={openedModal} onClose={close} title="Success!">
              <div style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  {session?.status !== 'authenticated' ? 'You\'re almost there! 🙌' : 'Congratulations! You did it! 🥳'}
                </Text>
                <Text>
                  {session.status === 'unauthenticated' ? 'Sign in and press the button to make the owl happy 😃' : 'Press the button to make the owl happy!'}
                </Text>
                <div style={styles.owlContainer}>
                  <DotLottieReact
                    src={owlPath}
                    autoplay={false}
                    loop={false}
                    dotLottieRefCallback={dotLottieRefCallback}
                  />
                </div>
                <Button color={owlColor} onClick={() => play()} disabled={session?.status !== 'authenticated'} style={styles.owlButton} variant='outline' >Press</Button>


                {session?.status !== 'authenticated' ?
                  <Button onClick={() => { bottomSheet.toggleBottomSheet(); close(); }} style={styles.modalButtonSignIn} variant={'gradient'} gradient={{ from: 'blue', to: 'violet', deg: 167 }}>
                    Sign In For Owl 🥺
                  </Button> : null}
              </div>
            </Modal>
          </div>

          <div style={isMobileLayout ? { ...styles.portfolioSection, ...styles.portfolioSectionMobile } : styles.portfolioSection}>
            <Portfolio />
          </div>

          <Button
            variant='gradient'
            style={{
              ...styles.bottomPeekButton,
              ...(isMobileLayout ? styles.bottomPeekButtonMobile : null),
              ...(showBottomPeekTrigger ? styles.bottomPeekButtonVisible : styles.bottomPeekButtonHidden),
            }}
            onClick={openModal}
          >
            {session.status === 'authenticated' ? "How's Owl? 🦉" : isTouchPrimaryInput ? 'Tap Here? 👀' : 'Click Here? 👀'}
          </Button>
        </>
      </div >
    </>
  );
}

const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1
    },
    confettiOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      pointerEvents: 'none'
    },
    partyContainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '40vh',
    },
    portfolioSection: {
      width: '100%'
    },
    portfolioSectionMobile: {
      marginTop: 8,
    },
    partyButton: {
      marginTop: 8,
      fontSize: 22,
    },
    modalButtonSignIn: {
      marginTop: 32,
      fontSize: 22,
    },
    bottomPeekButton: {
      position: 'fixed',
      left: '50%',
      bottom: 8,
      zIndex: 12,
      transition: 'opacity 180ms ease, transform 220ms ease',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.24)',
    },
    bottomPeekButtonMobile: {
      bottom: 10,
      fontSize: 12,
      paddingLeft: 10,
      paddingRight: 10,
      minHeight: 32,
    },
    bottomPeekButtonHidden: {
      opacity: 0,
      transform: 'translate(-50%, 62%)',
      pointerEvents: 'none',
    },
    bottomPeekButtonVisible: {
      opacity: 1,
      transform: 'translate(-50%, 0)',
      pointerEvents: 'auto',
    },
    partyParrotContainer: {
      height: 250,
      width: 250,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    owlContainer: {
      height: 170
    },
    modalContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      paddingTop: 16
    },
    owlButton: {
      marginTop: 16
    },
    modalTitle: {
      marginBottom: 24,
      fontSize: 24
    },
    blurbText: {
      margin: 50,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 700
    }
  });
}
