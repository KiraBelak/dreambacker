const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 justify-items-center space-y-4">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        <span className="text-white">Loading server data...</span>
      </div>
    </div>
  );
};

export default Loading;
