import React from 'react';
import './styles/AboutUs.css';
import { MdOutlinePhoneIphone, MdEmail } from 'react-icons/md'; // Import icons

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="about-title">
        <h1 className="about">About us</h1>
      </div>
      <div className="about-us-container">
      <section className="about-section">
        <div className="who-we-are">
          <h2>Who We Are</h2>
          <p>
            Laundry Wise Company is a trusted laundry pickup and delivery service dedicated to making laundry hassle-free. We provide convenience for customers by allowing them to schedule pickups, track orders, and receive updates online.
          </p>
        </div>

        <div className="our-mission">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a seamless and convenient laundry booking system that saves time and ensures customer satisfaction. We combine technology with professional care to offer an effortless laundry experience.
          </p>
        </div>

        <div className="our-vision">
          <h2>Our Vision</h2>
          <p>
            To be the most reliable and customer-centric laundry service, offering innovative solutions that simplify everyday life.
          </p>
        </div>

        <div className="core-values">
          <h2>Our Core Values</h2>
          <p>
            <strong>Reliability:</strong> We ensure timely pickup and delivery, so you never have to worry about laundry again.
          </p>
          <p>
            <strong>Quality Service:</strong> Every garment receives expert care with premium cleaning techniques.
          </p>
          <p>
            <strong>Convenience:</strong> Simple online booking, easy payments, and hassle-free delivery.
          </p>
          <p>
            <strong>Customer Satisfaction:</strong> Your happiness is our priority, and we strive to exceed expectations.
          </p>
          <p>
            <strong>Sustainability:</strong> We use eco-friendly detergents and energy-efficient processes.
          </p>
        </div>
      </section>

      <section className="contact-us">
        <h3>Contact Us</h3>
        <p><MdOutlinePhoneIphone style={{ fontSize: '18px', color: '#fff' }} /> Phone: +63 905 143 2486</p>
        <p><MdEmail style={{ fontSize: '18px', color: '#fff' }} /> Email: laundrywise.co@gmail.com</p>
      </section>
    </div>
    </div>
  );
};

export default AboutUs;
