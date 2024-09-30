import React, { useEffect, useRef, useState } from "react";
import { Suspense } from "react";
import Loader from "../components/Loader";
import CTA from "../components/CTA";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, ScrollControls, Scroll, useScroll, Html } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import { easing } from "maath";
import ProductsInfo from "../components/ProductsInfo";

const material = new THREE.LineBasicMaterial({ color: "white" });
const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -0.5, 0),
  new THREE.Vector3(0, 0.5, 0),
]);

const state = proxy({
  clicked: null,
  urls: [1, 2, 3, 4, 5, 6,9].map(
    (u) => `/${u}.jpg`
  ),
});

function Minimap() {
  const ref = useRef();
  const scroll = useScroll();
  const { urls } = useSnapshot(state);
  const { height } = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    ref.current.children.forEach((child, index) => {
      const y = scroll.curve(
        index / urls.length - 1.5 / urls.length,
        4 / urls.length
      );
      easing.damp(child.scale, "y", 0.15 + y / 6, 0.15, delta);
    });
  });
  return (
    <group ref={ref}>
      {urls.map((_, i) => (
        <line
          key={i}
          geometry={geometry}
          material={material}
          position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]}
        />
      ))}
    </group>
  );
}

function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
  const ref = useRef();
  const scroll = useScroll();
  const { clicked, urls } = useSnapshot(state);
  const [hovered, hover] = useState(false);
  const click = () => (state.clicked = index === clicked ? null : index);
  const over = () => hover(true);
  const out = () => hover(false);
  useFrame((state, delta) => {
    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    );
    // get the img clik
    const isClicked = clicked === index;
    // set the img scale
    easing.damp3(
      ref.current.scale,
      [clicked === index ? 4.7 : scale[0], clicked === index ? 6 : 5 + y, 1],
      0.15,
      delta
    );
    ref.current.material.scale[0] = ref.current.scale.x;
    ref.current.material.scale[1] = ref.current.scale.y;
    if (clicked !== null && index < clicked)
      easing.damp(ref.current.position, "x", position[0] - 2, 0.15, delta);
    if (clicked !== null && index > clicked)
      easing.damp(ref.current.position, "x", position[0] + 2, 0.15, delta);
    if (clicked === null || clicked === index)
      easing.damp(ref.current.position, "x", position[0], 0.15, delta);
    easing.damp(
      ref.current.material,
      "grayscale",
      hovered || clicked === index ? 0 : Math.max(0, 1 - y),
      0.15,
      delta
    );
    easing.dampC(
      ref.current.material.color,
      hovered || clicked === index ? "white" : "#aaa",
      hovered ? 0.3 : 0.15,
      delta
    );

  });
  return (
    <Image
      ref={ref}
      {...props}
      position={position}
      scale={scale}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
      />
     
  );
}

function Items({ w = 0.7, gap = 0.15 }) {
  const { urls } = useSnapshot(state);
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;

  return (
    <ScrollControls
      horizontal
      damping={0.1}
      pages={(width - xW + urls.length * xW) / width}
      
    >
      <Minimap />
      <Scroll>
        {
          urls.map((url, i) => (
            <Item
              key={i}
              index={i}
              position={[i * xW, 0, 0]}
              scale={[w, 1, 1]}
              url={url}
            />
          )) /* prettier-ignore */
        }
      </Scroll>
    </ScrollControls>
  );
}

function Projects() {
  const [isHovered, setIsHovered] = useState(false);
  const { clicked } = useSnapshot(state);
  useEffect(() => {
    if (isHovered) {
      // Disable page scroll when hovered
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable page scroll when not hovered
      document.body.style.overflow = "auto";
    }
  
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isHovered]);
  
  // Handle hover over the div
    const handleHoverin = () => {
      setIsHovered(true);
    };
   // Handle hover out of the div
   const handleHoverOut = () => {
    setIsHovered(false);
  };
  return (
    <section className="max-container">
      {/* Top */}
      <h1 className="head-text ">
        Hello, These are some of my{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Projects
        </span>{" "}
        💻
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          These hands-on projects provided me with valuable programming
          knowledge and troubleshooting experience.
        </p>
      </div>
      {/* Mid */}
      <div className="mt-16 flex flex-wrap gap-12">
        <h3 className="subhead-text">My Projects</h3>
      </div>
      {clicked !== null && <ProductsInfo clicked={clicked} onClose={() => (state.clicked = null)}/>}
      <div className=" flex flex-col w-full h-screen pt-16 " onPointerOver={handleHoverin} onPointerOut={handleHoverOut}>
        <Canvas
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
          onPointerMissed={() => (state.clicked = null)}
          className="-translate-y-16"
        >
          <Suspense fallback={<Loader />}>
            <Items />
          </Suspense>
        </Canvas>
        <CTA />
      </div>
    </section>
  );
}

export default Projects;