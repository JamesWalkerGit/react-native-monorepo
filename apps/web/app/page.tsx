"use client";

import { useRouter } from "next/navigation";
import Confetti from 'react-confetti'
import { useState } from "react";
import Image from 'next/image';
import { StyleSheet } from "../styles/Stylesheet";
import { Button, Spinner } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react"
import { IconBrandGithub } from "@tabler/icons-react";


export default function Web() {
  const [confettiStatus, setConfettiStatus] = useState(false);

  const router = useRouter();
  const session = useSession();

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
          <Spinner aria-label="loading-spinner" />
        </div>
      </>
      :
      <>
        <title>Jprojects</title>
        <div style={styles.container}>
          {
            confettiStatus ?
              <Confetti aria-label="confetti-party" />
              : null
          }
          <>
            <div style={styles.partyContainer}>
              <Image priority={true} src={"/static/images/parrot.gif"} alt={"partyParrot"} width={200} height={200} style={{ padding: 10 }}></Image>
              <Button color="secondary" onPress={toggleConfetti} style={styles.partyButton}>
                Party Button 🎉
              </Button>
            </div>
            <div style={styles.partyContainer}>
              {session.status === 'unauthenticated' ?
                <>
                  <Button onPress={() => signIn()} style={styles.githubButton} startContent={<IconBrandGithub color="white" />}>
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
                    <Button color="secondary" onPress={() => signOut()} style={styles.githubButton}>
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
    flex: 1,
    height: '100%'
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
    justifyContent: 'center',
    flex: 1,
    display: 'flex',
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
  }
});