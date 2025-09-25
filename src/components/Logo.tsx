import { LoaderPinwheel } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center justify-start space-x-5 mb-5">
      <LoaderPinwheel size={40} />
      <p className="text-2xl font-bold">Spin Games</p>
    </div>
  );
};

export default Logo;
