import { type PropsWithChildren } from "react";
import styles from "./components.module.css";

export const PageLayout = (props: PropsWithChildren<object>) => {
  return (
    <main className={styles.main}>
      <div className={styles.mainContent}>{props.children}</div>
    </main>
  );
};
