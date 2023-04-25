import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>TermINator</title>
      </Head>
      <div className={`${styles.container} ${""}`}>
        <div className={styles.console}>
          <div className={styles.consoleHeader}>Header</div>
          <div className={styles.consoleBody}>
            <p>ls</p>
            <p>
              Mandatory arguments to long options are mandatory for short
              options too.
            </p>
            <p>-a, --all do not ignore entries starting with . </p>
            <p>-A, --almost-all do not list implied . and .. </p>
            <p>--author with -l, print the author of each file </p>
            <p>-b, --escape print C-style escapes for nongraphic characters</p>
          </div>
        </div>
      </div>
    </>
  );
}
