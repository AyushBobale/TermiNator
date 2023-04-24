import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>TermINator</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.console}>
          <div className={styles.consoleHeader}>Header</div>
          <div className={styles.consoleBody}>
            ls <br />
            Mandatory arguments to long options are mandatory for short options
            too. <br />
            -a, --all do not ignore entries starting with . <br />
            -A, --almost-all do not list implied . and .. <br />
            --author with -l, print the author of each file <br />
            -b, --escape print C-style escapes for nongraphic characters
          </div>
        </div>
      </div>
    </>
  );
}
