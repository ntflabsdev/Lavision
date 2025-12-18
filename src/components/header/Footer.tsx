import { Facebook, Twitter, Instagram, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Logo } from '../../utls/imagepath';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer
      className="pt-16 px-6 pb-5"
      style={{
        background: `linear-gradient(to bottom right, #05051F 80.76%, #9F5EB0 140.63%)`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
          <LazyLoadImage
            effect="blur"
            src={Logo}
            alt="Logo"
            className="h-20 mb-4 cursor-pointer"
            onClick={() => navigate('/')}
          />
            <p className="text-[#FFFFFFCC] text-base leading-relaxed mb-8">
              AI-powered 3D worlds that bring your goals to life. Visualize your dreams, live your future.
            </p>
            <div className="flex space-x-6">
              <div className="w-11 h-11 bg-[#CB65FE] rounded-full flex items-center justify-center hover:bg-[#B04ED6] transition-colors cursor-pointer">
                <Facebook size={24} color="#fff" />
              </div>
              <div className="w-11 h-11 bg-[#CB65FE] rounded-full flex items-center justify-center hover:bg-[#B04ED6] transition-colors cursor-pointer">
                <Twitter size={24} color="#fff" />
              </div>
              <div className="w-11 h-11 bg-[#CB65FE] rounded-full flex items-center justify-center hover:bg-[#B04ED6] transition-colors cursor-pointer">
                <Instagram size={24} color="#fff" />
              </div>
              <div className="w-11 h-11 bg-[#CB65FE] rounded-full flex items-center justify-center hover:bg-[#B04ED6] transition-colors cursor-pointer">
                <Github size={24} color="#fff" />
              </div>
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col md:flex-row md:justify-end md:space-x-20">
            <div className="mb-9 md:mb-0">
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">Features</a></li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">How It Works</a></li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">Pricing</a></li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">Blog</a></li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">Download</a></li>
              </ul>
            </div>
            <div className="mb-9 md:mb-0">
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">About</a></li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">Blog</a></li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">Careers</a></li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">Help Center</a></li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">Privacy Policy</a></li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">Terms of Service</a></li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[#CB65FE] rounded-full inline-block"></span><a href="#" className="text-white hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;