import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import firstCarView from "../assets/firstCarView.png"
import firstCarVideoView from "../assets/SecondCar.gif"
import homeIcon from "../assets/ion_home.svg"
import officeIcon from "../assets/basil_bag-solid.svg"
import outSideCar1 from "../assets/outsideCar1.gif"
import innerCar from "../assets/innerCar.mp4"
import officeSide1 from "../assets/officeSide1.gif"
import LeftoutSideCar1 from "../assets/OutsideleftCarView1.gif"
import BackoutSideCar2 from "../assets/outSideBackCarView1.gif"
import RightoutSideCar3 from "../assets/OutsideRightSideCarView1.gif"
import FrontoutSideCar4 from "../assets/OutsideFrontCarView1.gif"
import officeViewLeft from "../assets/officeInsideLeftView.gif"
import officeViewFront from "../assets/officeInsideFrontView.gif"
import { CarFront, ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
type AngleView = {
  key: 'normal'| 'front' | 'left' | 'back' | 'right';
  label: string;
  src: string;
};

const carAngles: AngleView[] = [
  { key: 'normal', label: 'Normal View', src: outSideCar1 },
  { key: 'front', label: 'Front View', src: FrontoutSideCar4 },
  { key: 'left', label: 'Left View', src: LeftoutSideCar1 },
  { key: 'back', label: 'Back View', src: BackoutSideCar2 },
  { key: 'right', label: 'Right View', src: RightoutSideCar3 },
];

type OfficeAngleKey = 'default' | 'front' | 'left';

type OfficeAngleView = {
  key: OfficeAngleKey;
  label: string;
  src: string;
};

const officeAngles: OfficeAngleView[] = [
  { key: 'default', label: 'Office Default View', src: officeSide1 },
  { key: 'front', label: 'Office Front View', src: officeViewFront },
  { key: 'left', label: 'Office Left View', src: officeViewLeft },
];
function CarCenter({screen}:{screen:number}) {
  const nav = useNavigate();
  const [isOutside, setIsOutside] = useState(true);
  const defaultAngleIndex = carAngles.findIndex((angle) => angle.key === 'normal');
  const [currentAngleIndex, setCurrentAngleIndex] = useState(
    defaultAngleIndex >= 0 ? defaultAngleIndex : 0
  );
  const [currentOfficeAngleIndex, setCurrentOfficeAngleIndex] = useState(0);

  const toggleState = () => {
    setIsOutside(!isOutside);
  };

  const handleNextAngle = () => {
    setCurrentAngleIndex((prev) => (prev + 1) % carAngles.length);
  };

  const setOfficeAngleByKey = (key: OfficeAngleKey) => {
    const index = officeAngles.findIndex((angle) => angle.key === key);
    if (index !== -1) {
      setCurrentOfficeAngleIndex(index);
    }
  };

  useEffect(() => {
    if (screen !== 4) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        handleNextAngle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextAngle, screen]);

  useEffect(() => {
    if (screen !== 5) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setCurrentOfficeAngleIndex((prev) => (prev + 1) % officeAngles.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen]);

  const handleNavigate = () => {
    nav(isOutside ? '/outside-car-view' : '/inner-car-view');
  };
const driveHandle = () => {
  console.log("driving");
   nav('/car-trail');
}
const insideHandle = () => {
  nav('/inner-car-view');
}
const OutSideHandle = () => {
  nav('/outside-car-view');
}
const GoToHome = () => {
  nav('/dream-worlds');
}

const GoToOffice = () => {
  nav('/office');
}
const MoveToCar = () => {
  nav('/car');
}
  return (
    <div className="h-[100vh] relative overflow-hidden [background:linear-gradient(180deg,#05051F_16.76%,#9F5EB0_140.63%),linear-gradient(122.01deg,#0A0B10_0%,#1A1339_50%,#402659_100%)]">
   
   
{
  screen == 1 ? 
  <>
      <img 
        src={firstCarView}
        className="object-cover h-full w-full"
      /> 
       
  <div style={{position:"relative", top:"-110px",color:"white", display:"flex", justifyContent:"center",width:"250px", margin:"0 auto", height:"60px", background:"linear-gradient(90deg, #00AAFF 0%, #CC66FF 100%)", borderRadius:"30px", boxShadow:"0px 4px 15px rgba(59, 130, 246, 0.4)"}} >
        <button onClick={driveHandle} className='w-full'>
          DRIVE
        </button>
       </div>
       </>
       : screen == 2 ? 
       <>
  <div className="absolute bottom-0 left-[20px] flex flex-col gap-4 pb-[20px]">
    <img src={homeIcon} alt="home logo" className="cursor-pointer" onClick={GoToHome}/>
    <img src={officeIcon} alt="office logo" className="cursor-pointer" onClick={GoToOffice}/>
  </div>

  <img 
    src={firstCarVideoView}
    className="object-cover w-full h-full"
  />

  <div style={{position:"relative", left:"0px", top:"-110px", color:"white", display:"flex", justifyContent:"center", width:"250px", margin:"0 auto", height:"60px", borderRadius:"30px"}}>
    
      
      
      
      {/* Toggle Button Container */}
      <div className="relative w-64 h-16 rounded-full bg-[linear-gradient(90deg,rgba(0,170,255,0.4)_0%,rgba(204,102,255,0.4)_100%)] shadow-lg overflow-hidden">
        {/* Toggle Circle - Click for toggle only */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleState();
          }}
          className="absolute top-2 h-12 w-12 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out z-10 hover:scale-110"
          style={{
            left: isOutside ? '0.5rem' : 'calc(100% - 3.5rem)'
          }}
        />
        
        {/* Text - Click for navigation */}
        <button
          onClick={handleNavigate}
          className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg hover:bg-black hover:bg-opacity-10 transition-all"
        >
          {isOutside ? 'Show Outside' : 'Show Inside'}
        </button>
      </div>
      
     
   
  </div>
</>
:  screen==4 ?
 <>
        <div className="absolute bottom-0 left-[20px]">
     <img src={homeIcon} alt="home logo" className="cursor-pointer" onClick={GoToHome}/>;
       <img src={officeIcon} alt="office logo" className="cursor-pointer" onClick={GoToOffice}/>;
    </div>

     <img 
        src={carAngles[currentAngleIndex].src}
        className="object-cover w-full h-full"
      />
 
    

      <div style={{position:"relative",left:"0px", top:"-110px",color:"white", display:"flex", justifyContent:"center",width:"250px", margin:"0 auto", height:"60px",  borderRadius:"30px"}}>

        
       
        <button
          onClick={insideHandle}
          className="relative w-64 h-16 rounded-full transition-all duration-300 hover:shadow-xl bg-[linear-gradient(90deg,rgba(0,170,255,0.6)_0%,rgba(204,102,255,0.6)_100%)]"
        >
         Show Inside
        </button>
        
       
    </div>
     
     
</> : 
screen == 3 ?
 <>
        <div className="absolute bottom-0 left-[20px] flex flex-col gap-[20px] pb-[40px]">
     <img src={homeIcon} alt="home logo" className="cursor-pointer" onClick={GoToHome}/>
       <img src={officeIcon} alt="office logo" className="cursor-pointer" onClick={GoToOffice}/>
    </div>

     <video 
        muted
        autoPlay
        loop
        src={innerCar}
        className="object-cover w-full h-full"
      />

      <div style={{position:"relative",left:"0px", top:"-110px",color:"white", display:"flex", justifyContent:"center",width:"210px", margin:"0 auto", height:"60px",  borderRadius:"30px"}}>
     
        
       
        
        <button
          onClick={OutSideHandle}
          className="relative w-64 h-16 rounded-full transition-all duration-300 hover:shadow-xl bg-[linear-gradient(90deg,rgba(0,170,255,0.4)_0%,rgba(204,102,255,0.4)_100%)]"
        >
         
            Show OutSide
        </button>
        
        
      </div>

     
     
</>
: 
      <>
        <div className="absolute bottom-0 left-[20px] flex flex-col gap-[20px] pb-[20px] z-10">
          <CarFront size={50} color='white' className='cursor-pointer' onClick={MoveToCar}/>
          <img src={homeIcon} alt="home logo" className="cursor-pointer" onClick={GoToHome}/>
          <img src={officeIcon} alt="office logo" className="cursor-pointer" onClick={GoToOffice}/>
        </div>

        {/* Office views fullscreen background */}
        <div className="absolute inset-0">
          <img 
            src={officeAngles[currentOfficeAngleIndex].src}
            className="object-cover w-full h-full"
            alt={officeAngles[currentOfficeAngleIndex].label}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60" />
        </div>

        {/* Center arrow controls */}
        <div className="absolute inset-0 flex items-end justify-center pb-[50px]">
          <div className="relative w-[16px] h-[16px] flex items-center justify-center ]">
            {/* Up / Front */}
            <button
              className="absolute -top-10 left-1/2 -translate-x-1/2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              onClick={() => setOfficeAngleByKey('front')}
            >
              <ArrowUp className="w-7 h-7" />
            </button>

            {/* Left */}
            <button
              className="absolute top-1/2 -left-10 -translate-y-1/2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              onClick={() => setOfficeAngleByKey('left')}
            >
              <ArrowLeft className="w-7 h-7" />
            </button>

            {/* Right -> default for now */}
            <button
              className="absolute top-1/2 -right-10 -translate-y-1/2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              onClick={() => setOfficeAngleByKey('default')}
            >
              <ArrowRight className="w-7 h-7" />
            </button>

            {/* Down -> default view */}
            <button
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              onClick={() => setOfficeAngleByKey('default')}
            >
              <ArrowDown className="w-7 h-7" />
            </button>
          </div>
        </div>

       
      </>
}
     


       

        </div>
  )
}

export default CarCenter