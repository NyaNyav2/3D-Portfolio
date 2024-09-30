import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5 '>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>Kien</span>
        👋
        <br />
        I am an IT student at the Posts and Telecommunications Institute of Technology
        <br/>
        <p className="text-sm">-Navigate using the left and right arrows for optimal viewing-</p>
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box '>
        <p className='font-medium sm:text-xl text-center'>
          Worked with many projects <br /> and picked up many skills along the way
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
          Learn more
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 5) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          Led multiple projects to success over the years. <br /> Curious about the projects?
        </p>

        <Link to='/projects' className='neo-brutalism-white neo-btn'>
          Visit my portfolio
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
      <p className='font-medium sm:text-xl text-center'>
      I'm in my fourth year of university<br/> I am excited to apply my programming knowledge in a professional setting.
      </p>

      <Link to='/about' className='neo-brutalism-white neo-btn'>
        See my profile
        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
      </Link>
    </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
      <p className='font-medium sm:text-xl text-center'>
      Need a project done or looking for a dev? <br/> I'm just a few keystrokes away
      </p>

      <Link to='/contact' className='neo-brutalism-white neo-btn'>
        Let's talk
        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
      </Link>
    </div>
    );
  }


  return null;
};

export default HomeInfo;