import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";
import styles from "./components.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div className={styles.post}>
      <Image
        width={200}
        height={200}
        className={styles.feedProfileImage}
        src={author.profilePicture}
        alt={`@${author.username}'s profile picture`}
      />
      <div className={styles.postContent}>
        <div className={styles.postAuthor}>
          <Link href={`/@${author.username}`}>
            <span>{`@${author.username}`}</span>
          </Link>
          <span>·</span>
          <Link href={`/post/${post.id}`}>
            <span className={styles.postTime}>
              {dayjs(post.createdAt).fromNow()}
            </span>
          </Link>
        </div>
        <span className={styles.postText}>{post.content}</span>
      </div>
    </div>
  );
};
