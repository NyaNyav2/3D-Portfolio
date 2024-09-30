import React, { useEffect, useRef } from 'react'
import { Suspense,useState } from 'react';
import {Canvas} from '@react-three/fiber';
import { Loader } from '../components';
import Town from '../models/Town';
import Sky from '../models/Sky';
import Plane from '../models/Plane';
import HomeInfo from '../components/HomeInfo';
import sound from '../assets/sound.mp3'
import { soundon,soundoff } from '../assets/icons';

function Home() {
  const audioRef = useRef(new Audio(sound));
  audioRef.current.volume=0.4;
  audioRef.current.loop=true;
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] =useState(false);

  useEffect(()=>{
       if(isPlayingMusic){
        audioRef.current.play();
       }
       return()=>{
        audioRef.current.pause();
       }
  },[isPlayingMusic])
  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;
    
    if (window.innerWidth < 768) {
      screenScale = [0.06, 0.06, 0.06];
      screenPosition = [0, -0.001, -48.4];
    } else {
      screenScale = [0.06, 0.06, 0.06];
      screenPosition = [0, 2, -40.4];
    }
    
    return [screenScale, screenPosition];
  };
  
  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;
    
    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, 0, -1];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, 0, -8];
    }
    
    return [screenScale, screenPosition];
  };
  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();
  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
           {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div> 
      <div className='absolute top-2 left-2 z-10'>
        <img src={!isPlayingMusic?soundoff:soundon} alt="sound" className="w-10 h-10 cursor-pointer object-contain" onClick={()=>setIsPlayingMusic(!isPlayingMusic)} />

      </div>
      <Canvas 
      className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing':'cursor-grab'} `}
      camera={{near:0.1, far:1000, fov:50, position:[0,0,6]}}
      >
      <Suspense fallback={<Loader/>}>
         <directionalLight position={[1, 10, 1]} intensity={4} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
            />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={1}
            />
       <Sky isRotating={isRotating}/>   
       <Town
       position={islandPosition}
       scale={islandScale}
       isRotating={isRotating}
       setIsRotating={setIsRotating}
       setCurrentStage={setCurrentStage}
       />
       <Plane
       position={biplanePosition}
       scale={biplaneScale}
       rotation={[0, 20.1, 0]}
       isRotating={isRotating}
       />
      </Suspense>
      </Canvas>
    </section>
  )
}

export default Home