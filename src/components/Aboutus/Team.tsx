
import team1 from '../../assets/team1.png';
import team2 from '../../assets/team2.png';
import team3 from '../../assets/team3.png';
import team4 from '../../assets/team4.png';
 const Teams = () => {
    const teamMembers = [
          {
              name: 'Alex Stone',
              role: 'Head of AI',
              image: team1,
              description:"Alex leads the AI innovation at LaVision, combining expertise in machine learning and human-computer interaction to create intelligent, personalized 3D experiences. His mission is to make AI a powerful yet accessible tool that helps people clearly see and live their future."
          },
          {
              name: 'Maya Rodriguez',
              role: 'CTO & Co-Founder',
              image: team2,
              description:"Maya is the technical visionary behind LaVision, driving the development of our cutting-edge platform. With a background in software engineering and immersive technologies, she is passionate about building tools that empower creators to bring their most ambitious ideas to life."
          },
          {
              name: 'Marcus Nova',
              role: 'Head of Generative AI',
              image: team3,
              description:"Marcus spearheads the integration of generative AI into LaVision's platform, enabling users to create dynamic, adaptive 3D worlds. His expertise in neural networks and creative AI fuels our mission to revolutionize how people visualize and interact with their aspirations."
          },
          {
              name: 'Aria Vega',
              role: 'Company Director',
              image: team4,
              description:"Aria oversees LaVision's strategic direction and operations, ensuring that our vision aligns with user needs and market trends. With a strong background in business development and technology management, she is dedicated to fostering innovation and growth within the company."   
          }
      ];
  return (
  
               <div className="flex justify-center gap-[40px] items-start overflow-x-visible">
                            {teamMembers.map((member, index) => (
                                <div 
                                    key={index} 
                                    className="group transition-all duration-500 ease-in-out"
                                    style={{
                                        width: '221px',
                                        flexShrink: 0
                                    }}
                                   onMouseEnter={(e) => {
  e.currentTarget.style.width = "500px";
  e.currentTarget.style.background = "linear-gradient(180deg, rgba(0, 0, 0, 0) -10.73%, #303030 100%)";
}}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.width = '221px';
                                    }}
                                >
                                    <div
                                        className="bg-[linear-gradient(180deg,#7F66FF_0%,#B265EC_100%)] rounded-[16px] p-6 text-white relative w-full h-[531px] overflow-hidden group-hover:bg-[linear-gradient(180deg,rgba(0,0,0,0)_-10.73%,#000000_100%)] transition-all duration-500 ease-in-out"
        
                                    >
                                        <div className="mb-4 text-center opacity-100 group-hover:opacity-0 absolute top-6 left-1/2 transform -translate-x-1/2 trasi w-full z-10 transition-all duration-500 ease-in-out">
                                            <h3 className="text-xl font-bold mb-1 whitespace-nowrap">{member.name}</h3>
                                            <p className="text-purple-200 text-sm whitespace-nowrap">{member.role}</p>
                                        </div>
                                        
                                        <div className="flex gap-4 mt-[60px]">
                                        
                                            <div
                                                className="rounded-2xl h-[305px] w-[221px] top-[230px] left-0 overflow-hidden flex-shrink-0 absolute group-hover:inset-0 group-hover:object-contain gropu-hover:z-0 group-hover:h-full group-hover:w-full transition-all duration-500 ease-in-out
                                                "
                                            >
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover group-hover:object-top"
                                                />
                                            </div>

                                         
                                            <div 
                                                className="w-[302px] group-hover:w-[100%] opacity-0 group-hover:opacity-100 left-0 px-6 transition-opacity duration-500 delay-200 flex-shrink-0 absolute z-10 bottom-0"
                                        
                                            >
                                                <div className=" p-4 flex group-hover:z-10  flex-col items-start w-full">
                                            <p className="text-purple-200 text-sm whitespace-nowrap">{member.role}</p>
                                                     <h3 className="text-xl font-bold mb-1 whitespace-nowrap">{member.name}</h3>
                                                    <p className="text-white text-sm leading-relaxed">
                                                        {member.description}
                                                    </p>
                                                    <button style={{
                                                        background: `linear-gradient(180deg, #7F66FF 0%, #B265EC 100%)`

                                                    }} className='px-4 py-2 rounded-lg mt-2'>See More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

  );
}
export default Teams