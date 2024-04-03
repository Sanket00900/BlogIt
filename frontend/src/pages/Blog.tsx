// @ts-nocheck

import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/Avatar";
import Spinner from "../components/Spinner";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  //@ts-ignore
  const name = blog.author?.name || "Anonymous";
  if (loading || !blog) {
    return (
      <>
        <Appbar />
        <div className="h-screen flex justify-center items-center">
          {" "}
          <Spinner />{" "}
        </div>
      </>
    );
  }

  return (
    <>
      <Appbar />
      <div className="grid gid-cols-1 lg:grid-cols-12 m-8 gap-6">
        <div className="col-span-8">
          <div className="text-3xl md:text-5xl font-bold">{blog.title}</div>
          <div className="text-slate-500 font-light my-4">
            Posted on August 24, 2024
          </div>
          <div>{blog.content}</div>
        </div>

        <div className="col-span-4">
          <div className="text-lg">Author</div>

          <div className="inline-flex justify-center items-center gap-2 p-4">
            <div className="flex justify-center">
              <Avatar name={name} />
            </div>
            <div className="text-2xl font-bold">
              {blog.author?.name || "Anonymous"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
