import Link from "next/link";
import { trpc } from "../../utils/trpc";

function PostListingPage() {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);

  if (isLoading) return <p>Loading posts...</p>;

  return (
    <>
      {data?.map((post) => (
        <article key={post.id}>
          <p>{post.title}</p>
          <Link href={`/posts/${post.id}`}>Read more ...</Link>
        </article>
      ))}
    </>
  );
}

export default PostListingPage;
