import React, { useState, useRef, useMemo   } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Canvas, extend, useThree, useRender } from "react-three-fiber"
import { useSpring, a } from "react-spring/three"
import "./style.css"

extend({ OrbitControls })
const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  useRender(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls
      // autoRotate
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}
 

const Box = () => {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  const props = useSpring({
    scale: active ? [.3, .3, 1.2] : [.3, .3, .1] ,
    color: hovered ? "hotpink" : "grey",
  })

 
 
 function Extrusion({ start = [0,0], paths, ...props }) {
 


  var heartShape = new THREE.Shape();
  var x = 0, y = 0;
heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

 
  var shape = new THREE.Shape();
  shape.moveTo( 0,0 );
  shape.lineTo( 0, 2 );
  shape.lineTo( 2, 2 );
  shape.lineTo( 2, 0 );
  shape.lineTo( 0, 0 );

  var extrudeSettings = {
    steps:  1,
    depth: 3,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 0,
    bevelOffset: 1,
    bevelSegments: 4,

 
  };
  

  return (
    <a.mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setActive(!active)}
          scale={props.scale} 
          castShadow
     >
      <extrudeGeometry attach="geometry" args={[heartShape, extrudeSettings]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh> 
  )
}


 

  return (

    <>
      <Extrusion
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setActive(!active)}
        scale={props.scale} 
        color={props.color} 
        castShadow
        />
    </>

  )
}

export default () => {

  return (
        <Canvas
          camera={{ position: [0, 0, 5] }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true
            gl.shadowMap.type = THREE.PCFSoftShadowMap
          }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[15, 20, 5]} penumbra={1} castShadow />
          <fog attach="fog" args={["black", 10, 25]} />
          <Controls />
          <Box />
 
        </Canvas>
  )
}
