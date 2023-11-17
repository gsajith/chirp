import styles from "./components.module.css";

export const LoadingSpinner = () => {
  return <div className={styles.ldsDualRing}></div>;
};

export const LoadingPage = () => {
  return (
    <div className={styles.loadingPage}>
      <LoadingSpinner />
    </div>
  );
};
