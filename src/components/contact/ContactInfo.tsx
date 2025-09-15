import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8 text-purple-600" />,
      title: 'Phone',
      info: '+0123 456 789',
      buttonText: 'Call',
      buttonAction: () => window.open('tel:+0123456789')
    },
    {
      icon: <Mail className="w-8 h-8 text-purple-600" />,
      title: 'Email',
      info: 'demo@gmail.com',
      buttonText: 'Contact',
      buttonAction: () => window.open('mailto:demo@gmail.com')
    },
    {
      icon: <MapPin className="w-8 h-8 text-purple-600" />,
      title: 'Visit us',
      info: 'San Francisco, CA',
      buttonText: 'Location',
      buttonAction: () => window.open('https://maps.google.com/?q=San+Francisco,+CA')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 text-center shadow-sm border border-purple-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {method.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{method.title}</h3>
              <p className="text-lg text-gray-600 mb-6">{method.info}</p>
              <button
                onClick={method.buttonAction}
                className="bg-[#D072FF] hover:bg-[#D072FF] text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                {method.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;