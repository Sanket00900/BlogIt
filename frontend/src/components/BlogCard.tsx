import { Circle } from "./Circle";
import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";
interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="flex justify-center">
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-md lg:max-w-lg cursor-pointer">
          <div className="flex">
            <Avatar name={authorName} size="small" />
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
              {authorName}
            </div>
            <div className="flex pl-2 justify-center flex-col">
              <Circle />
            </div>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
              {publishedDate}
            </div>
          </div>
          <div className="text-xl font-semibold pt-2">{title}</div>
          <div className="text-md font-thin">
            {content.slice(0, 100) + "..."}
          </div>
          <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
          </div>
        </div>
      </div>
    </Link>
  );
};
