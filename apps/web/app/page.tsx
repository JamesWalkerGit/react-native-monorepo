"use client";

import Confetti from 'react-confetti'
import { useEffect, useState } from "react";
import { StyleSheet } from "@/styles/Stylesheet"
import { useSession } from "next-auth/react"
import { Button, Modal, Transition, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import PartyParrot from './components/animations/PartyParrot';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const loadingBirdPath = '../../../animations/lottie/loadingBird.lottie'

export default function Homepage() {
  const [confettiStatus, setConfettiStatus] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [loadButtons, setLoadButtons] = useState(false);
  const session = useSession();
  const { height, width } = useViewportSize();
  const styles = createStyles();

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
          transition="fade-down"
          duration={1250}
          timingFunction="ease"
        >
          {(fadeStyle) => {
            return <Confetti height={height} width={width} tweenDuration={2500} numberOfPieces={500}
              aria-label="confetti-party" style={fadeStyle}
            />
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
            <Modal opened={opened} onClose={close} title="Success!">
              <div style={styles.modalContainer}>
                <Text style={{ marginBottom: 24 }}>
                  Congratulations! You did it! 🥳
                </Text>
                <Text>
                  Earn more points to save this bird!
                </Text>
                <div style={styles.birdContainer}>
                  <DotLottieReact
                    src={loadingBirdPath}
                    loop
                    autoplay
                    autoResizeCanvas={true}
                  />
                </div>
              </div>
            </Modal>
            <Button variant='gradient' style={styles.modalButton} onClick={open}>Click it? 👀</Button>
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
    modalButton: {
      margin: 20
    },
    partyParrotContainer: {
      height: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    birdContainer: {
      height: 80
    },
    modalContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      paddingTop: 16
    }
  });
}
