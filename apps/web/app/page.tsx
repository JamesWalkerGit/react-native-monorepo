"use client";

import Confetti from 'react-confetti'
import { useEffect, useState } from "react";
import { StyleSheet } from "@/styles/Stylesheet"
import { useSession } from "next-auth/react"
import { Box, Button, Modal, Transition, } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import PartyParrot from './components/animations/PartyParrot';

export default function Homepage() {
  const [confettiStatus, setConfettiStatus] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const session = useSession();
  const { height, width } = useViewportSize();

  const styles = createStyles();

  const toggleConfetti = () => {
    setConfettiStatus(!confettiStatus)
  }

  const [loadButtons, setLoadButtons] = useState(false);

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
            <PartyParrot />

            <Box style={{ ...{ flexDirection: 'column', display: 'flex' } }}>
              <Button onClick={toggleConfetti} style={styles.partyButton} variant={'gradient'} gradient={{ from: 'pink', to: 'violet', deg: 167 }}>
                Party Button 🎉
              </Button>
              <Modal opened={opened} onClose={close} title="Congratulations!">
                You did it! 🥳
              </Modal>
              <Button variant='gradient' style={styles.modalButton} onClick={open}>Click it? 👀</Button>
            </Box>



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
  });
}
