import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import carMovingGif from '../assets/carmoving.gif';
import CarCenter from '../components/CarCenter';

const DreamCarScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
     <CarCenter screen={1}/>
    </div>
  );
};

export default DreamCarScreen;
