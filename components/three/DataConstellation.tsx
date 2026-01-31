'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Individual node in the constellation
interface NodeData {
  position: THREE.Vector3
  basePosition: THREE.Vector3
  velocity: THREE.Vector3
  connections: number[]
  size: number
  color: THREE.Color
  pulseOffset: number
  orbitRadius: number
  orbitSpeed: number
  orbitPhase: number
}

// Connection line between nodes
function ConnectionLines({ nodes, opacity }: { nodes: NodeData[]; opacity: number }) {
  const linesRef = useRef<THREE.LineSegments>(null)

  const { positions, colors } = useMemo(() => {
    const pos: number[] = []
    const col: number[] = []

    nodes.forEach((node, i) => {
      node.connections.forEach((targetIdx) => {
        if (targetIdx > i) {
          // Start point
          pos.push(node.position.x, node.position.y, node.position.z)
          // End point
          pos.push(
            nodes[targetIdx].position.x,
            nodes[targetIdx].position.y,
            nodes[targetIdx].position.z
          )

          // Color with gradient effect
          const startColor = new THREE.Color('#4a9b9b')
          const endColor = new THREE.Color('#1e3a5f')
          col.push(startColor.r, startColor.g, startColor.b)
          col.push(endColor.r, endColor.g, endColor.b)
        }
      })
    })

    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
    }
  }, [nodes])

  useFrame(() => {
    if (!linesRef.current) return

    const posArray = linesRef.current.geometry.attributes.position.array as Float32Array
    let idx = 0

    nodes.forEach((node, i) => {
      node.connections.forEach((targetIdx) => {
        if (targetIdx > i) {
          posArray[idx++] = node.position.x
          posArray[idx++] = node.position.y
          posArray[idx++] = node.position.z
          posArray[idx++] = nodes[targetIdx].position.x
          posArray[idx++] = nodes[targetIdx].position.y
          posArray[idx++] = nodes[targetIdx].position.z
        }
      })
    })

    linesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={opacity * 0.3}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  )
}

// Floating particles along connections
function DataParticles({ count = 100 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null)

  const { positions, velocities, lifetimes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const life = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 3

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      vel[i * 3] = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02

      life[i] = Math.random()
    }

    return { positions: pos, velocities: vel, lifetimes: life }
  }, [count])

  useFrame((state) => {
    if (!particlesRef.current) return

    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      lifetimes[i] += 0.005

      if (lifetimes[i] > 1) {
        lifetimes[i] = 0
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 2 + Math.random() * 3

        posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        posArray[i * 3 + 2] = r * Math.cos(phi)
      } else {
        posArray[i * 3] += velocities[i * 3] + Math.sin(time + i) * 0.002
        posArray[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(time + i) * 0.002
        posArray[i * 3 + 2] += velocities[i * 3 + 2]
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#4a9b9b"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// Main constellation of data nodes
function Constellation() {
  const groupRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.InstancedMesh>(null)
  const glowRef = useRef<THREE.InstancedMesh>(null)
  const { viewport, pointer } = useThree()

  const nodeCount = 35

  const nodes = useMemo<NodeData[]>(() => {
    const data: NodeData[] = []
    const colors = [
      new THREE.Color('#1e3a5f'),
      new THREE.Color('#243b53'),
      new THREE.Color('#334e68'),
      new THREE.Color('#4a9b9b'),
      new THREE.Color('#3d8585'),
    ]

    // Create nodes in a spherical distribution with some clustering
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.5 + Math.random() * 2.5

      const position = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi) - 1
      )

      data.push({
        position: position.clone(),
        basePosition: position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.001,
          (Math.random() - 0.5) * 0.001,
          (Math.random() - 0.5) * 0.001
        ),
        connections: [],
        size: 0.08 + Math.random() * 0.12,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseOffset: Math.random() * Math.PI * 2,
        orbitRadius: 0.1 + Math.random() * 0.2,
        orbitSpeed: 0.2 + Math.random() * 0.3,
        orbitPhase: Math.random() * Math.PI * 2,
      })
    }

    // Create connections based on proximity
    data.forEach((node, i) => {
      data.forEach((otherNode, j) => {
        if (i !== j && node.connections.length < 4) {
          const distance = node.basePosition.distanceTo(otherNode.basePosition)
          if (distance < 1.8 && Math.random() > 0.3) {
            node.connections.push(j)
          }
        }
      })
    })

    return data
  }, [])

  // Set initial instance matrices and colors
  useEffect(() => {
    if (!nodesRef.current || !glowRef.current) return

    const dummy = new THREE.Object3D()
    const color = new THREE.Color()

    nodes.forEach((node, i) => {
      dummy.position.copy(node.position)
      dummy.scale.setScalar(node.size)
      dummy.updateMatrix()

      nodesRef.current!.setMatrixAt(i, dummy.matrix)
      nodesRef.current!.setColorAt(i, node.color)

      // Glow is larger
      dummy.scale.setScalar(node.size * 2)
      dummy.updateMatrix()
      glowRef.current!.setMatrixAt(i, dummy.matrix)
      glowRef.current!.setColorAt(i, node.color)
    })

    nodesRef.current.instanceMatrix.needsUpdate = true
    nodesRef.current.instanceColor!.needsUpdate = true
    glowRef.current.instanceMatrix.needsUpdate = true
    glowRef.current.instanceColor!.needsUpdate = true
  }, [nodes])

  useFrame((state) => {
    if (!nodesRef.current || !glowRef.current || !groupRef.current) return

    const time = state.clock.elapsedTime
    const dummy = new THREE.Object3D()

    // Subtle mouse influence
    const mouseX = pointer.x * 0.3
    const mouseY = pointer.y * 0.3

    nodes.forEach((node, i) => {
      // Orbital motion around base position
      const orbitX = Math.cos(time * node.orbitSpeed + node.orbitPhase) * node.orbitRadius
      const orbitY = Math.sin(time * node.orbitSpeed + node.orbitPhase) * node.orbitRadius
      const orbitZ = Math.sin(time * node.orbitSpeed * 0.5 + node.orbitPhase) * node.orbitRadius * 0.5

      node.position.x = node.basePosition.x + orbitX
      node.position.y = node.basePosition.y + orbitY
      node.position.z = node.basePosition.z + orbitZ

      // Pulse effect
      const pulse = 1 + Math.sin(time * 2 + node.pulseOffset) * 0.1
      const size = node.size * pulse

      dummy.position.copy(node.position)
      dummy.scale.setScalar(size)
      dummy.updateMatrix()

      nodesRef.current!.setMatrixAt(i, dummy.matrix)

      // Glow follows with larger scale
      dummy.scale.setScalar(size * 2.5)
      dummy.updateMatrix()
      glowRef.current!.setMatrixAt(i, dummy.matrix)
    })

    nodesRef.current.instanceMatrix.needsUpdate = true
    glowRef.current.instanceMatrix.needsUpdate = true

    // Gentle rotation following mouse
    groupRef.current.rotation.y += (mouseX * 0.5 - groupRef.current.rotation.y) * 0.02
    groupRef.current.rotation.x += (mouseY * 0.3 - groupRef.current.rotation.x) * 0.02
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Glow layer */}
      <instancedMesh ref={glowRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </instancedMesh>

      {/* Main nodes */}
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          roughness={0.3}
          metalness={0.7}
          envMapIntensity={0.5}
        />
      </instancedMesh>

      {/* Connection lines */}
      <ConnectionLines nodes={nodes} opacity={1} />

      {/* Floating particles */}
      <DataParticles count={150} />
    </group>
  )
}

// Ambient glow sphere
function AmbientGlow() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    meshRef.current.rotation.y = time * 0.05
    meshRef.current.rotation.x = time * 0.03
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <sphereGeometry args={[4, 64, 64]} />
      <meshBasicMaterial
        color="#1e3a5f"
        transparent
        opacity={0.05}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#4a9b9b" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#4a9b9b" />

      {/* Main constellation */}
      <Constellation />

      {/* Background glow */}
      <AmbientGlow />
    </>
  )
}

export default function DataConstellation() {
  const [isVisible, setIsVisible] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleVisibility = () => setIsVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)

    // Delay loading for better initial paint
    const timer = setTimeout(() => setIsLoaded(true), 100)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      clearTimeout(timer)
    }
  }, [])

  if (!isLoaded) return null

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        frameloop={isVisible ? 'always' : 'demand'}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
