'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { heroConfig } from '@/lib/constants'

interface BlockData {
  position: THREE.Vector3
  targetPosition: THREE.Vector3
  scale: number
  color: THREE.Color
  rotationSpeed: THREE.Vector3
  driftOffset: THREE.Vector3
}

function FloatingBlocks() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const { viewport } = useThree()

  const blocks = useMemo<BlockData[]>(() => {
    const data: BlockData[] = []
    const colors = heroConfig.colors.map((c) => new THREE.Color(c))

    for (let i = 0; i < heroConfig.blockCount; i++) {
      const scale =
        heroConfig.blockSize.min +
        Math.random() * (heroConfig.blockSize.max - heroConfig.blockSize.min)

      // Distribute blocks in a wider area
      const spreadX = viewport.width * 0.8
      const spreadY = viewport.height * 0.6

      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * spreadX,
          (Math.random() - 0.5) * spreadY,
          (Math.random() - 0.5) * 3 - 2
        ),
        targetPosition: new THREE.Vector3(),
        scale,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        driftOffset: new THREE.Vector3(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
      })
    }

    return data
  }, [viewport.width, viewport.height])

  // Set initial positions and colors
  useEffect(() => {
    if (!meshRef.current) return

    const dummy = new THREE.Object3D()
    const color = new THREE.Color()

    blocks.forEach((block, i) => {
      dummy.position.copy(block.position)
      dummy.scale.setScalar(block.scale)
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
      meshRef.current!.setColorAt(i, block.color)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  }, [blocks])

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const dummy = new THREE.Object3D()

    blocks.forEach((block, i) => {
      // Gentle drifting motion
      const driftX =
        Math.sin(time * 0.3 + block.driftOffset.x) * 0.2
      const driftY =
        Math.cos(time * 0.25 + block.driftOffset.y) * 0.15
      const driftZ =
        Math.sin(time * 0.2 + block.driftOffset.z) * 0.1

      dummy.position.set(
        block.position.x + driftX,
        block.position.y + driftY,
        block.position.z + driftZ
      )

      // Slow rotation
      dummy.rotation.x += block.rotationSpeed.x
      dummy.rotation.y += block.rotationSpeed.y
      dummy.rotation.z += block.rotationSpeed.z

      dummy.scale.setScalar(block.scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, heroConfig.blockCount]}
      frustumCulled={false}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        transparent
        opacity={0.85}
        roughness={0.4}
        metalness={0.1}
      />
    </instancedMesh>
  )
}

function Scene() {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.6} />

      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
      />

      {/* Secondary fill light */}
      <directionalLight
        position={[-5, -5, -5]}
        intensity={0.3}
        color="#4a9b9b"
      />

      {/* Floating blocks */}
      <FloatingBlocks />
    </>
  )
}

export default function HeroScene() {
  const [isVisible, setIsVisible] = useState(true)

  // Handle visibility change to throttle animation when tab is not active
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        }}
        frameloop={isVisible ? 'always' : 'demand'}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
