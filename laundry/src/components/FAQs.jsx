import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './styles/FAQs.css';

const faqsData = [
  {
    question: 'Is Laundry Wise a laundry service?',
    answer:
      'No, we are not a laundry service provider. We facilitate transactions between customers and laundry businesses for booking and subscription management.',
  },
  {
    question: 'How do I book a laundry pickup?',
    answer:
      'Simply create an account, select your preferred laundry provider, book a service, and confirm your booking.',
  },
  {
    question: 'What subscription plans do you offer?',
    answer:
      'We offer different plans based on automatic scheduling, such as twice a week, three times a week, and weekly. Two of the plans provide percentage discounts.',
  },
  {
    question: 'How do I pay for my laundry service?',
    answer:
      'Payments are made through our platform using online payment through Gcash.',
  },
  {
    question: 'Are there any hidden fees?',
    answer:
      'No, all prices are transparent and shown upfront before confirming a booking or subscription plan.',
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faqs-container">
      <div className="faqs-title-wrapper">
        <h2 className="faqs-title">Frequently Asked Questions</h2>
      </div>
      {/* FAQ Card Wrapper */}
      <div className="faqs-box">
        <div className="faqs-list">
          {faqsData.map((faq, index) => (
            <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
