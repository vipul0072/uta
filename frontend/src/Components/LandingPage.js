import React from "react";
import "../style/LandingPage.css";
import tennisImage from '../assets/one.jpg'
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  return (
    <div className="landing-page">
      <div className="landing-content">
      
       <div className="content">
       <div className="inner">
       <h1>Nissan All India Open Seniors Tennis Tournaments 2024</h1>
       <p className="para">Dehradun, 8th - 9th December 2024</p>
       </div>
        <img src={tennisImage} alt="Tennis Tournamenrs" className="landing-image"></img>
       </div>
        <div className="factsheet">
          <h2>Factsheet and rules:</h2>
          <p><strong>1) </strong>Categories : A (Open), B (90+ combined), C (105+ combined), D (120+ combined), Lucky Doubles. This is Only Doubles Tournament.</p>
          <p><strong>2) </strong> Lucky Doubles Format - Any participant who loses both the matches in the first round shall be considered for the draw of Lucky Doubles. Any participant who opted for one event and loses in the first round will also be eligible. Pairing up logic will be as follows: All the participants will be divided into X(Age<span>&#8804;</span>50 years) and  Y(Age<span>&#62;</span>50 years) categories. Each pair will have one person from X category and one person from Y category  based on lottery system.</p>
          <p><strong>3) </strong>Age Limit is 30 years.</p>
          <p><strong>4) </strong>The age of any participant shall be calculated as his running age as on 9th December. For example if the participant turns 29 on the 8th December, he can be considered as 30. PLease carry your age proof with you. </p>
          <p><strong>5) </strong>One player can participate in max 2 categories (excluding lucky doubles which could be the 3rd for any participant). </p>
          <p><strong>6) </strong>Coaches are allowed to play in Category A only. Any Individual who earns via tennis coaching shall be defined as Coach.</p>
          <p><strong>7) </strong> Entry Fee for two events is 4500 (6000 with double sharing accommodation of up to 2 days) and one event is 3000 (4500 with double sharing accommodation of up to 2 days).</p>
          <p><strong>8)</strong>Breakfast and Lunch shall be provided on both days and Gala dinner on the 9th December.</p>
          <p><strong>9) </strong>Every participant shall get Indian Tree T-Shirt, Shorts, Socks, Cap, Wristband (MRP more than Rs 3000).</p>
          <p><strong>10) </strong>Prize money for the winner team is 21000 and for the runners up team is 11000. Each Semi-Finalist team shall get 4000. Lucky Doubles Prize shall be 50% (10500 for winner, 5500 for runner up, 2000 each for SF).</p>
          <p><strong>11)</strong>Last date for entry Fees is 7th December.</p>
          <p><strong>12)</strong>No entry fees shall at all be accepted after 7th December.</p>
          <p><strong>13) </strong>Draws and Order of Play shall be published on the 8th December.</p>
          <p><strong>14)</strong>If any team does not turn up at scheduled time, walk-over shall be given to the opponent within 15 minutes.</p>
          <p><strong>15) </strong>Balls for the Tournament shall be Head Tour.</p>        
          <p><strong>16)</strong>For any query Please contact Tournament Director Sumit Goel (Ph. 9412977857)</p>
          <p><strong>17)</strong>Venue of the tournament - <a href=" https://maps.app.goo.gl/fPLo9aK52WSihktY6" rel="noreferrer" target="_blank">Shanti Tennis Academy</a> </p>
          <p><strong>18) </strong>Venue for Gala Party and Stay - OM farms, 8-A, Jogiwala, Badripur, Dehradun, Uttarakhand 248005</p>
          <p><strong>19)</strong>The Maximum size of the draw in any category is 32.</p>
          <p><strong>20)</strong>There are 4 hard courts and 4 additional hard courts at a nearby venue if required.</p>
          <p><strong>21)</strong> List of participants Registered so far.  <a href="https://tinyurl.com/UK2023ENTRIES" rel="noreferrer" target="_blank">List</a></p>
          <p><strong>22)</strong>After registration, do join the participants whatsapp group through the link below.
<a href="https://chat.whatsapp.com/JTvbjXSOolF7KI5ORr46DY" rel="noreferrer" target="_blank">Join group</a></p>
        </div>
        {/* <div className="button-container">
          <button className="landing-btn btn-1" onClick={() => navigate("/admin-login")}>Admin Login</button>
          <button className="landing-btn btn-2" onClick={() => navigate("/register")}>Register</button>
          <button className="landing-btn btn-3" onClick={() => navigate("/user-login")}>User Login</button>
        </div> */}
      </div>
      
    </div>
  );
};
export default LandingPage;
