import Image from "next/image";

const Navbar = () => {
  return (
    <div className="z-10 absolute top-0 flex flex-row shadow-sm bg-white w-full justify-between items-center px-24 py-3">
      <h2 className="font-bold text-xl text-gray-900">Email Assistant</h2>

      <div className="flex flex-row rounded-full bg-gray-200 p-2 items-center justify-left pr-6">
        <Image
          src={"https://source.boringavatars.com/"}
          height={30}
          width={30}
        />

        <h2 className="text-lg font-medium text-gray-900 ml-4">Japneet</h2>
      </div>
    </div>
  );
};

export default Navbar;
