"use client";

import { useRouter } from "next/navigation";
import Confetti from 'react-confetti'
import { useState } from "react";
import Image from 'next/image';
import { StyleSheet } from "../styles/Stylesheet";
import { signIn, signOut, useSession } from "next-auth/react"
import { IconBrandGithub } from "@tabler/icons-react";
import { Button, Loader, Modal, } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";


export default function Homepage() {
  const [confettiStatus, setConfettiStatus] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();
  const session = useSession();
  const { height, width } = useViewportSize();

  const goTo = (route: string) => {
    router.push('/' + route)
  }

  const toggleConfetti = () => {
    setConfettiStatus(!confettiStatus)
  }

  return (
    session.status === 'loading' ?
      <>
        <div style={styles.loadingContainer}>
          <Loader color="blue" size={60} aria-label="loading-spinner" />
        </div>
      </>
      :
      <>
        <title>Jprojects</title>
        <div style={styles.container}>
          {
            confettiStatus ?
              <Confetti height={height} width={width} aria-label="confetti-party" />
              : null
          }
          <>
            <div style={styles.partyContainer}>
              <Image priority={true} src={"/static/images/parrot.gif"} alt={"partyParrot"} width={200} height={200} style={{ padding: 10 }}></Image>
              <Button onClick={toggleConfetti} style={styles.partyButton}
                variant={'gradient'} gradient={{ from: 'pink', to: 'violet', deg: 167 }}
              >
                Party Button 🎉
              </Button>
              <Modal opened={opened} onClose={close} title="Congratulations!">
                You did it! 🥳
              </Modal>
              <Button style={styles.modalButton} onClick={open}>Click it? 👀</Button>
            </div>
            <div style={styles.partyContainer}>
              {session.status === 'unauthenticated' ?
                <>
                  <Button onClick={() => signIn('github')} style={styles.githubButton} leftSection={<IconBrandGithub color="white" />}>
                    Sign In With GitHub
                  </Button>
                </>
                : session.status === 'authenticated' ?
                  <>
                    {session.data.user?.email ?
                      <>
                        <div style={styles.loggedInContainer}>Logged in as {session.data.user.email}</div>
                      </>
                      : null
                    }
                    <Button color="secondary" onClick={() => signOut()} style={styles.githubButton}>
                      Sign Out
                    </Button>
                  </>
                  : null
              }
            </div>
          </>
        </div >
      </>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%'
  },
  partyButton: {
    fontSize: 22,
  },
  githubButton: {
    backgroundColor: '#161b22'
  },
  loggedInContainer: {
    padding: 20
  },
  modalButton: {
    margin: 20
  },
});