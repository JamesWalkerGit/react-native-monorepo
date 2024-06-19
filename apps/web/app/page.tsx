"use client";

import { useRouter } from "next/navigation";
import Confetti from 'react-confetti'
import { useState } from "react";
import Image from 'next/image';
import { StyleSheet } from "../styles/Stylesheet";
import { Button } from "@nextui-org/react";


export default function Web() {
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
      <title>Jprojects</title>
      <div style={styles.container}>
        {
          confettiStatus ?
            <Confetti />
            : null
        }
        <>
          <div style={styles.partyContainer}>
            <Image src={"/static/images/parrot.gif"} alt={"partyParrot"} width={200} height={200} style={{ padding: 10 }}></Image>
            <Button color="secondary" onPress={toggleConfetti} style={styles.partyButton}>
              Party Button 🎉
            </Button>
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
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 100
  },
  authContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    maxWidth: 150,
  },
  loadingContainer: {
    justifyContent: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  partyButton: {
    height: 90,
    width: 180,
    fontSize: 22,
  }
});