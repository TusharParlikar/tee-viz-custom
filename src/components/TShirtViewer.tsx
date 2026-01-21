
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Center } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import Loader from './Loader';

// Load GLB model
const TShirtModel = ({ color, logoTexture }: { color: string; logoTexture: THREE.Texture | null }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/model/oversized_t-shirt.glb');
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  // Clone the scene to avoid modifying the original
  const clonedScene = scene.clone();

  // Apply color to all meshes in the model
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        if (mesh.material) {
          const material = (mesh.material as THREE.MeshStandardMaterial).clone();
          material.color = new THREE.Color(color);
          material.roughness = 0.6;
          material.metalness = 0.0;
          material.emissive = new THREE.Color(color);
          material.emissiveIntensity = 0.3;
          
          mesh.material = material;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      }
    });
  }, [color, clonedScene]);

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} scale={2.5} />
        
        {/* Logo/Design on chest area */}
        {logoTexture && (
          <mesh position={[0, 3.2, 0.28]} castShadow rotation={[0, 0, 0]} renderOrder={1}>
            <planeGeometry args={[0.75, 0.75]} />
            <meshBasicMaterial 
              map={logoTexture} 
              transparent 
              side={THREE.FrontSide}
              toneMapped={false}
              depthTest={false}
              depthWrite={false}
              opacity={1}
            />
          </mesh>
        )}
      </Center>
    </group>
  );
};

// Preload the model
useGLTF.preload('/model/oversized_t-shirt.glb');

// Preload the model
useGLTF.preload('/model/oversized_t-shirt.glb');

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
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.flipY = true;
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
      <Canvas 
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
          
          {/* Enhanced lighting setup for brighter colors */}
          <ambientLight intensity={0.8} />
          
          {/* Key light */}
          <spotLight 
            position={[5, 8, 5]} 
            angle={0.3} 
            penumbra={0.5} 
            intensity={2.0} 
            castShadow 
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
            color="#ffffff"
          />
          
          {/* Fill light */}
          <pointLight position={[-5, 3, -3]} intensity={1.2} color="#ffffff" />
          
          {/* Rim light */}
          <pointLight position={[0, -3, -5]} intensity={0.8} color="#ffffff" />
          
          {/* Back light for depth */}
          <directionalLight 
            position={[0, 5, -8]} 
            intensity={0.6} 
            color="#ffffff"
          />
          
          <TShirtModel color={color} logoTexture={logoTexture} />
          <OrbitControls 
            enableZoom={true}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 3}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TShirtViewer;
