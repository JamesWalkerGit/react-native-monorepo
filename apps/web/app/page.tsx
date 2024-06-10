"use client";

import { Button } from "@repo/ui";

import styles from "../styles/index.module.css";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Confetti from 'react-confetti'
import { useState } from "react";
import Image from 'next/image';




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
    <div className={styles.container}>
      {
        confettiStatus ?
          <Confetti />
          : null
      }
      {status === 'loading' ?
        <div><h1>Loading....</h1></div>
        :
        <>
          <h1>Web</h1>
          <div>
            Hello {session?.user?.email}
            <h1 className="text-3xl font-bold underline">
              Hello world! <img src="https://cultofthepartyparrot.com/parrots/hd/parrot.gif" data-src="/parrots/hd/parrot.gif" alt="Parrot"></img>
            </h1>
          </div>

          <Button onClick={toggleConfetti} text="Party Button" />
          {session ?
            <>
              <Button onClick={() => { signOut(); }} text="Logout" />
              <Button onClick={() => goTo('testpage')} text="Go to Test Page 1" />
            </>
            :
            <Button onClick={() => { signIn() }} text="Login" />
          }
        </>
      }
    </div>
  );
}