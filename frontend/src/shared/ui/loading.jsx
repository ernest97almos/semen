  const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-purple-200 rounded-full opacity-20 -translate-x-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-200 rounded-full opacity-15 animate-pulse-slow delay-500"></div>
      <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
      <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-pink-500 ml-3"></div>
      <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
    </div>
  );
};

export default Loading;
