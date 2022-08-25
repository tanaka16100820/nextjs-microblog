import React from 'react';
import Head from 'next/head';
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css"
import Link from 'next/link'

const name = "First Blog";
export const siteTitle = "Next.js Blog"

const Layout = ({children, home}) => {
  return (
    <div className={styles.container}>
        <Head>
            <link rel='icon' href="/favicon.ico"/>
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <img 
                src="/images/chara.jpg" 
                className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>

            </>
          ) : (
            <>
              <img 
                src="/images/chara.jpg" 
                className={utilStyles.borderCircle}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>

            </>
          )}
        </header>

        <main>
          {children}
        </main>
        {!home && (
          <Link href="/">←ホームへ戻る</Link>
        )}
    </div>
  )
}

export default Layout