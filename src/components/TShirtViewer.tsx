
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import Loader from './Loader';

// Define a placeholder T-shirt model until a real one is uploaded
const TShirtModel = ({ color, logoTexture }: { color: string; logoTexture: THREE.Texture | null }) => {
  const groupRef = useRef<THREE.Group>(null);
  // This will be replaced with a loaded GLB model in a real implementation
  
  // Create a simple t-shirt shape with front and back parts
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle automatic rotation
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Front part of T-shirt */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3, 4, 0.2]} />
        <meshStandardMaterial color={color as any} />
        
        {/* Apply logo texture to front if available */}
        {logoTexture && (
          <mesh position={[0, 0.5, 0.11]}>
            <planeGeometry args={[2, 2]} />
            <meshStandardMaterial map={logoTexture as any} transparent opacity={1} />
          </mesh>
        )}
      </mesh>
      
      {/* Shoulders/sleeves */}
      <mesh position={[-1.8, 0.7, 0]} castShadow>
        <boxGeometry args={[0.6, 1, 0.2]} />
        <meshStandardMaterial color={color as any} />
      </mesh>
      <mesh position={[1.8, 0.7, 0]} castShadow>
        <boxGeometry args={[0.6, 1, 0.2]} />
        <meshStandardMaterial color={color as any} />
      </mesh>
      
      {/* Neck hole */}
      <mesh position={[0, 1.8, 0.1]}>
        <cylinderGeometry args={[0.7, 0.7, 0.3, 32, 1, true]} />
        <meshStandardMaterial color={color as any} />
      </mesh>
    </group>
  );
};

// Main component
interface TShirtViewerProps {
  color: string;
  designImage: File | null;
}

const TShirtViewer = ({ color, designImage }: TShirtViewerProps) => {
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!designImage) {
      setLogoTexture(null);
      return;
    }

    // Create a URL for the uploaded image
    const imageUrl = URL.createObjectURL(designImage);

    // Load the texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (loadedTexture) => {
        loadedTexture.needsUpdate = true;
        setLogoTexture(loadedTexture);
      },
      undefined,
      (err) => {
        console.error('Error loading texture:', err);
      }
    );

    // Clean up
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [designImage]);

  return (
    <div className="h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden relative glass-card">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <TShirtModel color={color} logoTexture={logoTexture} />
          <OrbitControls 
            enableZoom={true}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TShirtViewer;
