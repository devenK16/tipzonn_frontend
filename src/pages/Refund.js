import React from 'react'; // Import your logo file
import './TermsConditions.css'; // Import your CSS file for styling
import Footer4 from '../components/footer4';

function Refunds(){
    return(
        <div className="container">
        <div className="header">
            <div className="logo">
            <h1>Tipzonn</h1> 
            </div>
            <h1>Privacy Policy</h1>
        </div>
        
      <div className="content">
        <p>The tip amount once paid CANNOT be refunded or cancelled under any circumstances.</p>
      </div>

        <div className="home-footer11">
            <Footer4></Footer4>
          </div>

        </div>
    );
}

export default Refunds;