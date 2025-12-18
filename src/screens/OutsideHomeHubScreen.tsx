import { useNavigate } from 'react-router-dom';
import homeHubGif from '../assets/homehub.gif';
import { useState } from 'react';
import { PenSquare, X } from 'lucide-react';
import firstTimeVisitImage from "../assets/dummyForFirstTime.png"
import projectLogo from "../assets/newLogo.png"
import welcomeHomeCenterImage from "../assets/welcomeHomeCenterImage.png"
const OutsideHomeHubScreen = ()  => {
  const navigate = useNavigate();
 const [firstTimeVisit,setFirstTimeVisit] =useState(true);
 const [isEditOpen, setIsEditOpen] = useState(false);
 const [editChoice, setEditChoice] = useState<'home' | 'car' | 'both'>('home');
 const [editText, setEditText] = useState('');
  const handleDreamHomeClick = () => {
    navigate('/inner-portal');
  };
 const startMagic = () =>{
  setFirstTimeVisit(false);
 }
  const handleDreamCarClick = () => {
    navigate('/car');
  };

  const handleEditSubmit = () => {
    // TODO: wire to real save flow
    console.log('Dream worlds edit:', { choice: editChoice, text: editText });
    setIsEditOpen(false);
    setEditText('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {
        firstTimeVisit ?
      <div className="relative w-full overflow-y-auto h-auto">
  {/* Background image */}
  <div className="absolute inset-0 -z-10">
    <img 
      src={firstTimeVisitImage}
      alt="bg"
      className="w-full h-full object-cover"
    />
  </div>

  {/* CENTER COLUMN */}
  <div className="flex justify-center pt-12 pb-20">
    <div className="w-full flex justify-center max-w-2xl flex-col items-center">

     <div className='h-[100vh] flex flex-col items-center justify-between'>
     
<div className='flex flex-col items-center justify-center  mt-[100px]'>
  
      <div className='flex flex-col items-center'>
      <h1 className="text-white text-[40px] font-bold">
      Welcome Home
      </h1>
      <p className="text-white mt-[-5px] text-[#FAFAFACC] text-[17px]">
   This is where your journey begins.
      </p>
 </div> 
</div>
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
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${homeHubGif})`,
        }}
      >
        <div className="absolute " />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-2xl md:text-4xl font-bold text-white mb-8 text-center absolute top-[100px]">
          Outside <span className="bg-gradient-to-r from-[#8B5CF6] to-[#60A5FA] bg-clip-text text-transparent">Home Hub</span>
        </p>

        {/* Secret clickable areas overlay on the GIF */}
        <div className="relative w-full max-w-6xl aspect-video">
          {/* Left side - Dream Home secret clickable area */}
          <button
            onClick={handleDreamHomeClick}
            className="absolute left-0 top-0 w-1/2 h-full cursor-pointer"
            aria-label="Dream Home"
          />

          {/* Right side - Dream Car secret clickable area */}
          <button
            onClick={handleDreamCarClick}
            className="absolute right-0 top-[50%] w-1/2 h-full cursor-pointer"
            aria-label="Dream Car"
          />
        </div>
      </div>
</>
        
      }
     {/* Edit controls bottom-left */}
     <div className="fixed bottom-6 left-6 z-40">
       <button
         onClick={() => setIsEditOpen(true)}
         className="w-12 h-12 rounded-full bg-black/50 border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition backdrop-blur shadow-lg"
         aria-label="Edit"
       >
         <PenSquare size={20} />
       </button>
     </div>

     {/* Edit popup */}
     {isEditOpen && (
       <div className="fixed bottom-24 left-6 w-[320px] rounded-2xl overflow-hidden border border-white/12 bg-gradient-to-br from-[#0B1024]/90 via-[#111832]/85 to-[#0F0B24]/90 backdrop-blur-2xl shadow-[0_18px_48px_rgba(0,0,0,0.55)] z-50">
         <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.16),transparent_35%)]" />
         <div className="relative p-4 space-y-3">
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/15 text-white">
                 <PenSquare size={18} />
               </span>
               <div>
                 <p className="text-white font-semibold leading-tight">Quick Edit</p>
                 <p className="text-xs text-white/70">Dream Worlds target</p>
               </div>
             </div>
             <button
               onClick={() => setIsEditOpen(false)}
               className="p-1.5 rounded-full hover:bg-white/10 transition text-white"
               aria-label="Close edit popup"
             >
               <X size={16} />
             </button>
           </div>

           <div className="space-y-2 text-sm text-white">
             <label className="flex items-center gap-2 cursor-pointer">
               <input
                 type="radio"
                 name="editChoice"
                 value="home"
                 checked={editChoice === 'home'}
                 onChange={() => setEditChoice('home')}
                 className="accent-[#8B5CF6]"
               />
               Home
             </label>
             <label className="flex items-center gap-2 cursor-pointer">
               <input
                 type="radio"
                 name="editChoice"
                 value="car"
                 checked={editChoice === 'car'}
                 onChange={() => setEditChoice('car')}
                 className="accent-[#8B5CF6]"
               />
               Car
             </label>
             <label className="flex items-center gap-2 cursor-pointer">
               <input
                 type="radio"
                 name="editChoice"
                 value="both"
                 checked={editChoice === 'both'}
                 onChange={() => setEditChoice('both')}
                 className="accent-[#8B5CF6]"
               />
               Both
             </label>
           </div>

           <input
             value={editText}
             onChange={(e) => setEditText(e.target.value)}
             placeholder="Type your update..."
             className="w-full rounded-xl bg-white/8 border border-white/15 text-black px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fuchsia-400/60 placeholder:text-white/60"
           />

           <button
             onClick={handleEditSubmit}
             className="w-full rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#6D8BFF] to-[#60A5FA] text-white font-semibold py-2.5 shadow-lg hover:opacity-95 transition"
           >
             Save
           </button>
         </div>
       </div>
     )}
    </div>
  );
};

export default OutsideHomeHubScreen;
