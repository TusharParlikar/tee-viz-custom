
import { useProgress } from '@react-three/drei';

interface LoaderProps {
  showTip?: boolean;
}

const Loader = ({ showTip = true }: LoaderProps) => {
  const { progress } = useProgress();
  
  return (
    <div className="w-full h-full fixed top-0 left-0 flex flex-col items-center justify-center bg-white bg-opacity-80 backdrop-blur-md z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-tshirt-purple/30 border-t-tshirt-purple rounded-full animate-spin-slow"></div>
        <p className="mt-4 font-medium text-gray-700">
          {progress.toFixed(0)}%
        </p>
        {showTip && (
          <p className="mt-2 text-sm text-gray-500 max-w-xs text-center">
            Loading 3D model. You'll be able to rotate and customize it soon!
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;
