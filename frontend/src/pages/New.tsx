export const New = () => {
  return (
    <div>
      <div className="p-8">
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Enter your title..."
          required
        />
      </div>
      <div className="p-8">
        <textarea
          id="message"
          rows={4}
          className="block p-8 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>
    </div>
  );
};
