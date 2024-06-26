"use client";

import Confetti from 'react-confetti'
import { useState } from "react";
import Image from 'next/image';
import { StyleSheet } from "@/styles/Stylesheet"
import { useSession } from "next-auth/react"
import { Button, Modal, } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";

export default function Homepage() {
  const [confettiStatus, setConfettiStatus] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const session = useSession();
  const { height, width } = useViewportSize();

  const styles = createStyles();

  const toggleConfetti = () => {
    setConfettiStatus(!confettiStatus)
  }

  return (
    <>
      <div style={styles.container}>
        {
          confettiStatus ?
            <Confetti height={height} width={width} tweenDuration={2500} numberOfPieces={500} aria-label="confetti-party" />
            : null
        }
        <>
          <div style={styles.partyContainer}>
            <Image priority={true} src={"/static/images/parrot.gif"} alt={"partyParrot"} width={200} height={200} style={styles.partyParrot}></Image>
            <Button onClick={toggleConfetti} style={styles.partyButton} variant={'gradient'} gradient={{ from: 'pink', to: 'violet', deg: 167 }}>
              Party Button 🎉
            </Button>
            <Modal opened={opened} onClose={close} title="Congratulations!">
              You did it! 🥳
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
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '90vh'
    },
    partyButton: {
      fontSize: 22,
    },
    partyParrot: {
      padding: 10
    },
    modalButton: {
      margin: 20
    },
  });
}
