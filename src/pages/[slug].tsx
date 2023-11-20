import Head from "next/head";

import styles from "./index.module.css";
import { type GetStaticProps, type NextPage } from "next";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import Image from "next/image";
import { LoadingPage } from "~/components/loading";
import { PostView } from "~/components/postview";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0) return <div>User has not posted.</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.map((fullPost) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.username}'s profile`}</title>
      </Head>
      <PageLayout>
        <div className={styles.profileContainer}>
          <Image
            className={styles.profileMainPicture}
            src={data.profilePicture}
            width={300}
            height={300}
            alt={`${data.username}'s profile pic`}
          />
        </div>
        <div style={{ height: 64 }} />
        <div className={styles.profileInfoContainer}>
          <div className={styles.profileUsername}>@{data.username}</div>
        </div>
        <div style={{ width: "100%", borderBottom: "1px solid #94a3b8" }} />
        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const slug = context.params?.slug;

  if (typeof slug !== "string") {
    throw new Error("No username slug");
  }

  const username = slug.replace("@", "");

  // Prefetch is a helper that lets you fetch data ahead of time and hydrate it through server-side props
  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(), // Takes all the data we fetched and puts it in a state that
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
