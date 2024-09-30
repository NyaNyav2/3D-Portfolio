import React, { Suspense, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { Canvas } from "@react-three/fiber";
import Demon from '../models/Demon'
import Loader from '../components/Loader'
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
function Contacts() {
  const formRef = useRef(null);
  const [form, setform] = useState({ name: "", email: "", message: "" });
  const [loading, setItLoading] = useState(false);
  const [curentAnimation,setcurentAnimation]=useState('Mon_DeathFire_002_CombatIdle');
  const { alert, showAlert, hideAlert } = useAlert();

  const handelChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleFocus = () => setcurentAnimation('Mon_DeathFire_002_CombatIdle');
  const handelBlur = () => setcurentAnimation('Mon_DeathFire_002_CombatIdle');
  const handelSubmit = (e) => {
    e.preventDefault();
    setItLoading(true);
    setcurentAnimation('Mon_DeathFire_002_CombatIdle');
    emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        { 
            from_name :form.name,
            to_name:'Văn Sỹ Kiên',
            from_email:form.email,
            to_email:'vansykien03@gmail.com',
            message:form.message
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY

    ).then(()=>{
        setItLoading(false);
        showAlert({show:true,text:'Message sent successfully', type:'success'})
        
        setTimeout(()=>{
            hideAlert();
            setcurentAnimation('Mon_DeathFire_002_CombatIdle');
            setform({name:'',email:'',message:''})
        },[3000])
    }).catch((error)=>{
        setItLoading(false);
        setcurentAnimation('Mon_DeathFire_002_CombatIdle');
        console.log(error);
        showAlert({show:true,text:'I didnt receive ur message ', type:'danger'})
    })
  };

  const adjustBipDemonForScreenSize = () => {
    let screenScale, screenPosition;
    
    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.3, 1.3, 1.3];
      screenPosition = [0, -4, 0];
    } else {
      screenScale = [1,1,1];
      screenPosition = [0.8,-2.7,0];
    }
    
    return [screenScale, screenPosition];
  };
  const [bidemonScale, bipdemonPosition] = adjustBipDemonForScreenSize();
  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch !</h1>
      <form
        action=""
        ref={formRef}
        className="flex-2 w-full flex flex-col gap-7 mt-14 "
        onSubmit={handelSubmit}
      >
        <label htmlFor="" className="text-black-500 font-mono">
          Name
          <input
            type="text"
            name="name"
            className="input "
            placeholder="Nguyễn Văn A"
            required
            value={form.name}
            onChange={handelChange}
            onFocus={handleFocus}
            onBlur={handelBlur}
          />
        </label>
        <label htmlFor="" className="text-black-500 font-mono">
          Email
          <input
            type="email"
            name="email"
            className="input"
            placeholder="xxxx@gmail.com"
            required
            value={form.email}
            onChange={handelChange}
            onFocus={handleFocus}
            onBlur={handelBlur}
          />
        </label>
        <label htmlFor="" className="text-black-500 font-mono">
          Leave me a message here
          <textarea
            name="message"
            className="input"
            placeholder="Let me know how T can help you?"
            required
            value={form.message}
            onChange={handelChange}
            onFocus={handleFocus}
            onBlur={handelBlur}
          />
        </label>
        <button
          type="submit"
          className="btn"
          onFocus={handleFocus}
          onBlur={handelBlur}
          disabled={loading}
        >
          {loading ? "Sending...." : "Send Message"} 
        </button>
      </form>
      </div>
      <div className=" lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] z-40">
            <Canvas
            camera={{position:[0,0,5],
                fov:75,
                near:0.1,
                far:1000
            }}
            >
                <directionalLight intensity={2} position={[0,0,1]} />
                <ambientLight intensity={0.3}/>
                <Suspense fallback={<Loader/>}>
                     <Demon
                     curentAnimation={curentAnimation}
                     position={bipdemonPosition}
                     rotation={[12.25,0,0]}
                     scale={bidemonScale}
                     />
                </Suspense>
            </Canvas>
        </div>
    </section>
  );
}

export default Contacts;
