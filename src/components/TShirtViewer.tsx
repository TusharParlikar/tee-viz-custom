
import { useRef, useState, useEffect, Suspense, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import Loader from './Loader';
import { toast } from 'sonner';

// Load GLB model
const TShirtModel = ({ color, frontLogoTexture, backLogoTexture, frontLogoSize, backLogoSize }: { color: string; frontLogoTexture: THREE.Texture | null; backLogoTexture: THREE.Texture | null; frontLogoSize: { width: number; height: number }; backLogoSize: { width: number; height: number } }) => {
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
        
        {/* Logo/Design on chest area (front) */}
        {frontLogoTexture && (
          <mesh position={[0, 3.4, 0.28]} castShadow rotation={[0, 0, 0]} renderOrder={1}>
            <planeGeometry args={[frontLogoSize.width, frontLogoSize.height]} />
            <meshBasicMaterial 
              map={frontLogoTexture} 
              transparent 
              side={THREE.FrontSide}
              toneMapped={false}
              depthTest={false}
              depthWrite={false}
              opacity={1}
            />
          </mesh>
        )}
        
        {/* Logo/Design on back area */}
        {backLogoTexture && (
          <mesh position={[0, 3.2, -0.28]} castShadow rotation={[0, Math.PI, 0]} renderOrder={1}>
            <planeGeometry args={[backLogoSize.width, backLogoSize.height]} />
            <meshBasicMaterial 
              map={backLogoTexture} 
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

// Main component
interface TShirtViewerProps {
  color: string;
  frontDesignImage: File | null;
  backDesignImage: File | null;
  frontDesignSize?: 'small' | 'medium';
  backDesignSize?: 'small' | 'medium';
}

const TShirtViewer = forwardRef<{ screenshot: () => void }, TShirtViewerProps>(({ color, frontDesignImage, backDesignImage, frontDesignSize = 'medium', backDesignSize = 'medium' }, ref) => {
  const [frontLogoTexture, setFrontLogoTexture] = useState<THREE.Texture | null>(null);
  const [backLogoTexture, setBackLogoTexture] = useState<THREE.Texture | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  
  // Define sizes for the logo based on selection
  const getSizeValues = (size: 'small' | 'medium') => {
    switch (size) {
      case 'small':
        return { width: 0.5, height: 0.5 };
      case 'medium':
        return { width: 0.75, height: 0.75 };
      default:
        return { width: 0.75, height: 0.75 };
    }
  };
  
  const frontLogoSize = getSizeValues(frontDesignSize);
  const backLogoSize = getSizeValues(backDesignSize);

  // Load front design texture
  useEffect(() => {
    if (!frontDesignImage) {
      setFrontLogoTexture(null);
      return;
    }

    const imageUrl = URL.createObjectURL(frontDesignImage);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (loadedTexture) => {
        loadedTexture.needsUpdate = true;
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.flipY = true;
        setFrontLogoTexture(loadedTexture);
      },
      undefined,
      (err) => {
        console.error('Error loading front texture:', err);
      }
    );

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [frontDesignImage]);

  // Load back design texture
  useEffect(() => {
    if (!backDesignImage) {
      setBackLogoTexture(null);
      return;
    }

    const imageUrl = URL.createObjectURL(backDesignImage);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (loadedTexture) => {
        loadedTexture.needsUpdate = true;
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.flipY = true;
        setBackLogoTexture(loadedTexture);
      },
      undefined,
      (err) => {
        console.error('Error loading back texture:', err);
      }
    );

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [backDesignImage]);

  // Expose screenshot method to parent
  useImperativeHandle(ref, () => ({
    screenshot: () => {
      if (canvasElementRef.current) {
        try {
          const dataUrl = canvasElementRef.current.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `tshirt-design-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
          toast.success('Design downloaded successfully!');
        } catch (error) {
          console.error('Error downloading design:', error);
          toast.error('Failed to download design');
        }
      }
    },
  }));

  return (
    <div className="h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden relative glass-card">
      <Canvas 
        ref={(canvas) => {
          if (canvas) {
            canvasElementRef.current = canvas as any as HTMLCanvasElement;
          }
        }}
        shadows
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
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
          
          <TShirtModel color={color} frontLogoTexture={frontLogoTexture} backLogoTexture={backLogoTexture} frontLogoSize={frontLogoSize} backLogoSize={backLogoSize} />
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
});

export default TShirtViewer;
