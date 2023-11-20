import Head from "next/head";
import { type GetStaticProps, type NextPage } from "next";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { PostView } from "~/components/postview";

const SinglePostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const { data } = api.posts.getById.useQuery({
    postId,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const postId = context.params?.id;

  if (typeof postId !== "string") {
    throw new Error("No post ID");
  }

  // Prefetch is a helper that lets you fetch data ahead of time and hydrate it through server-side props
  await ssg.posts.getById.prefetch({ postId });

  return {
    props: {
      trpcState: ssg.dehydrate(), // Takes all the data we fetched and puts it in a state that
      postId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
