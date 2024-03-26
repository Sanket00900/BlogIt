import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/useBlogs";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>blogs loading...</div>;
  }

  return (
    <div>
      <div>
        <Appbar />
        {blogs.map(({ author, title, content, id }) => (
          <BlogCard
            key={id}
            id={id}
            //@ts-ignore
            authorName={author.name || "Anonymous"}
            title={title}
            content={content}
            publishedDate={"13.03.2024"}
          />
        ))}
      </div>
    </div>
  );
};
