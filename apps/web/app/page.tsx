"use client";

// import { Button } from "@repo/ui";

import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Confetti from 'react-confetti'
import { useState } from "react";
import Image from 'next/image';
import { StyleSheet } from "../styles/Stylesheet";
import { Button, Spinner } from "@nextui-org/react";





export default function Web() {
  const { data: session, status } = useSession();
  const [confettiStatus, setConfettiStatus] = useState(false);

  const router = useRouter();
  const goTo = (route: string) => {
    router.push('/' + route)
  }


  const toggleConfetti = () => {
    setConfettiStatus(!confettiStatus)
  }

  return (
    <>
      {
        confettiStatus ?
          <Confetti />
          : null
      }
      <div style={styles.container}>
        {status === 'loading' ?
          <div style={styles.loadingContainer}>
            <Spinner size='lg' label="Loading..." />

          </div>

          :
          <>
            <div style={styles.partyContainer}>
              <Image src={"https://cultofthepartyparrot.com/parrots/hd/parrot.gif"} alt={"partyParrot"} width={200} height={200} style={{ padding: 10 }}></Image>
              <Button color="secondary" onPress={toggleConfetti}>
                Party Button 🎉
              </Button>
              {session ? <span style={{ padding: 10 }}>Hello {session?.user?.email}</span>
                : null}
            </div>

            {session ?
              <>
                <div style={styles.authContainer}>
                  <Button color="secondary" onPress={() => goTo('testpage')} style={{ margin: 2 }}>
                    Go to Test Page 1
                  </Button>
                  <Button color="secondary" onPress={() => signOut()} style={{ margin: 2 }}>
                    Logout
                  </Button>
                </div>
              </>
              :
              <div style={styles.authContainer}>
                <Button color="secondary" onPress={() => signIn()} style={{ margin: 2 }}>
                  Login
                </Button>
              </div>
            }
          </>
        }
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
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  authContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    maxWidth: 150,
    height: '100%',
  },
  loadingContainer: {
    justifyContent: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
});