import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

export const Appbar = () => {
  return (
    <div>
      <div className="border-b flex justify-between py-2 px-8">
        <Link to={"/blogs"}>
          <div className="flex flex-col justify-center cursor-pointer">
            BlogIt !
          </div>
        </Link>
        <div className="flex justify-center">
          <Link to={"/publish"}>
            <button
              type="button"
              className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-1.5 text-center mb-2 mx-8"
            >
              New
            </button>
          </Link>

          <Avatar name="sddfe" size="medium" />
        </div>
      </div>
    </div>
  );
};
