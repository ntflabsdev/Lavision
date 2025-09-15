import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <ContactHero />
      <ContactForm />
      <ContactInfo />
    </div>
  );
};

export default ContactPage;