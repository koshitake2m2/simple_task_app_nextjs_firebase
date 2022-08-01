import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "ui/styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push("/tasks")
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello
        </h1>
        <p>NEXT_PUBLIC_HELLO: {process.env.NEXT_PUBLIC_HELLO}</p>
        <p>NEXT_PUBLIC_WORLD: {process.env.NEXT_PUBLIC_WORLD}</p>
      </main>

      <footer className={styles.footer}>
        This is footer
      </footer>
    </div>
  );
};

export default Home;
