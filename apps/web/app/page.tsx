"use client";

import Confetti from 'react-confetti'
import { useEffect, useState } from "react";
import { StyleSheet } from "@/styles/Stylesheet"
import { useSession } from "next-auth/react"
import { Button, Modal, Transition, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import PartyParrot from './components/animations/PartyParrot';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useBottomSheet } from './contexts/BottomSheetContext';

const owlPath = '../../../animations/lottie/owl.lottie'
const owlColor = '#7375f0'

export default function Homepage() {
  const [confettiStatus, setConfettiStatus] = useState(false);
  const [openedModal, { open: openModal, close }] = useDisclosure(false);
  const [loadButtons, setLoadButtons] = useState(false);
  const [dotLottie, setDotLottie] = useState<any>(null);
  const session = useSession();
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
              <Confetti style={fadeStyle} height={height} width={width} numberOfPieces={200} initialVelocityY={-40}
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
            <Button variant='gradient' style={styles.modalButtonOwl} onClick={openModal}>Click Here? 👀</Button>

            <div style={{ display: 'flex', flex: .5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.blurbText} variant='gradient' gradient={{ from: 'blue', to: 'red', deg: 45 }} >
                A Playground for Creative Web App Experiments - Enjoy!</Text>
            </div>
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
                    autoResizeCanvas={true}
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
          <div style={styles.partyContainer}>
            {session.status === 'unauthenticated' ?
              <>
              </>
              : session.status === 'authenticated' ?
                <>
                </>
                : null
            }
          </div>
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
    partyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .5,
      display: 'flex',
      flexDirection: 'column',
      height: '50%'
    },
    partyButton: {
      marginTop: 8,
      fontSize: 22,
    },
    modalButtonSignIn: {
      marginTop: 32,
      fontSize: 22,
    },
    modalButtonOwl: {
      margin: 20
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
