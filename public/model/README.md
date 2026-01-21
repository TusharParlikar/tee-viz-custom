# 3D T-Shirt Model

## How to Add a Custom T-Shirt Model

To use the Sketchfab "Oversized t-shirt" model or any other GLB model:

### Option 1: Download from Sketchfab (Recommended)
1. Visit: https://sketchfab.com/3d-models/oversized-t-shirt-3b6e78d6a1a74370a6e5af6f312d38f7
2. Click the "Download 3D Model" button (requires free Sketchfab account)
3. Download in **glTF format (.glb)**
4. Rename the downloaded file to `tshirt.glb`
5. Place it in this directory (`public/model/`)

### Option 2: Use Any T-Shirt GLB Model
1. Find a t-shirt model in GLB/GLTF format from:
   - Sketchfab.com
   - CGTrader.com
   - TurboSquid.com
   - Poly Haven
2. Download the model
3. Place it as `tshirt.glb` in this directory

### Model Requirements
- **Format**: GLB or GLTF
- **File name**: `tshirt.glb`
- **Recommended size**: Under 10MB for best performance
- **Orientation**: Should face forward (positive Z-axis)

### Current Setup
The application currently uses a procedurally generated t-shirt. Once you add a `tshirt.glb` file here, you can update the `TShirtViewer.tsx` component to load it using:

```typescript
const { scene } = useGLTF('/model/tshirt.glb');
```

## Troubleshooting
- If the model appears too large/small, adjust the `scale` property in the component
- If the model is rotated incorrectly, adjust the `rotation` property
- Ensure the model has proper UVs for texture mapping
