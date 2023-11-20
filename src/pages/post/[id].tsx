import Head from "next/head";

import styles from "../index.module.css";
import { type NextPage } from "next";
import { PageLayout } from "~/components/layout";

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <PageLayout>
        <div>Post view</div>
      </PageLayout>
    </>
  );
};

export default SinglePostPage;
