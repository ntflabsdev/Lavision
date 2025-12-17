import { useState } from "react";
import { useNavigate } from "react-router-dom";
import projectLogo from "../assets/newLogo.png"
import reflectiomRoomImage from "../assets/reflectionRoom.png"
import reflectionRoomGif from "../assets/reflectionRoom.gif"
import homeIcon from "../assets/ion_home.svg"
function ReflectionRoom() {
    const navigate = useNavigate();
     const [firstTimeVisit,setFirstTimeVisit] =useState(true);
     const startMagic = () =>{
      setFirstTimeVisit(false);
     }
     const navigatePersonalElements = () => {
        navigate('/personal-elements');
     }
     const naviagteOnLawBook = ()=>{
        navigate('/law-book');
     }
     const naviagteOnMirror = ()=>{
        navigate('/mirror-room');
     }
  return (
       <div className="min-h-screen relative overflow-hidden">
      {
        firstTimeVisit ?
      <div className="relative w-full overflow-y-auto h-auto">
  {/* Background image */}
  <div className="absolute inset-0 -z-10">
    <img 
      src={reflectiomRoomImage}
      alt="bg"
      className="w-full h-full object-cover"
    />
  </div>

  {/* CENTER COLUMN */}
  <div className="flex justify-center pt-12 pb-20">
    <div className="w-full flex justify-center max-w-2xl flex-col items-center">

     <div className='h-[100vh] flex flex-col items-center justify-end'>
     

      <img 
       onClick={startMagic}
        src={projectLogo}
        className="w-[100px] rounded-lg animate-bounce cursor-pointer"
      />
       </div>

   

    </div>
  </div>
</div>
: 
<>
 <div className="absolute bottom-4 left-4 z-20">
          <img
            src={homeIcon}
            alt="home"
            className="w-12 h-12 cursor-pointer drop-shadow-lg"
            onClick={() => navigate('/dream-worlds')}
          />
        </div>
 <div 
        className="absolute inset-0 bg-no-repeat [background-size:100%_100%]"
        style={{
          backgroundImage: `url(${reflectionRoomGif})`,
        }}
      >
        <div className="absolute " />
      </div>
        <div className="relative w-full max-w-6xl aspect-video">
          {/* Left side - Dream Home secret clickable area */}
          <button
            onClick={navigatePersonalElements}
            className="absolute left-0 top-0 w-[35%]  h-[430px] cursor-pointer"
            aria-label="Dream Home"
          />

          {/* Right side - Dream Car secret clickable area */}
          <button
            onClick={naviagteOnLawBook}
            className="absolute right-[175px] top-[68%] w-[55%] h-[180px] cursor-pointer"
            aria-label="Dream Car"
          />
                <button
            onClick={naviagteOnMirror}
            className="absolute right-[-90px] top-[0%] w-[40%] h-[400px] cursor-pointer"
            aria-label="Dream Car"
          />
        </div>
        </>
}
</div>
  )
}

export default ReflectionRoom