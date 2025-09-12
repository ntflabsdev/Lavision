import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and you\'ll have immediate access to new features when upgrading.'
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes, we offer a 50% discount for students with a valid .edu email address. Contact our support team with your student ID to apply for the discount.'
    },
    {
      question: 'What happens to my dream worlds if I downgrade?',
      answer: 'Your dream worlds will be preserved but some advanced features may become unavailable. You can always upgrade again to regain full access to all your content and customizations.'
    },
    {
      question: 'What\'s included in customer support?',
      answer: 'All plans include email support within 24 hours. Legend plan users get priority support with response times under 4 hours, plus access to live chat and phone support during business hours.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes! All paid plans come with a 14-day free trial. You can explore all premium features risk-free, and cancel anytime during the trial period without being charged.'
    },
    {
      question: 'Can I use LaVision offline?',
      answer: 'LaVision requires an internet connection for AI processing and cloud synchronization. However, you can view previously generated content offline for up to 30 days.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-purple-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our pricing and features
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors"
              >
                <span className="text-xl  text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-purple-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;