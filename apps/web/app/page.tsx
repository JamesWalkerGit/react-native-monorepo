"use client";

import { Button } from "@repo/ui";

import styles from "../styles/index.module.css";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Web() {
  const { data: session, status } = useSession();


  const router = useRouter();
  const goTo = (route: string) => {
    router.push('/' + route)
  }

  return (
    <div className={styles.container}>
      {status === 'loading' ?
        <div><h1>Loading....</h1></div>
        :
        <>
          <h1>Web</h1>
          <div>
            Hello {session?.user?.email}
          </div>
          <Button onClick={() => console.log("Pressed!")} text="Boop" />
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
