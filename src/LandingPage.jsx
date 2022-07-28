import React, { useEffect, useState } from 'react';
import "./LandingPage.css";
import Logo from "./Logo.png";
import Logosmall from "./Logosmall.png";
import Event from "./Events.png"
import CardImg from "./CardImg.png"

export default function LandingPage() {
  const [eventData , setEventData] = useState();
  const [inputValue , setInputValue] = useState("");
  const [pastEvent , setPastEvent] = useState("true");


  useEffect(() => {
    fetch(`https://manage-api.konfhub.com/hosted-events?limit=8&search_query=${inputValue}&past_events=${pastEvent}`)
      .then((response) => response?.json())
      .then((result) => {
         setEventData(result);
      })
      .catch((error) => {
        console.log(error)
      })

  },[inputValue , pastEvent]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleEvent = (EventType) => {
    setPastEvent(EventType)
  }

  return (
    <div className='wholeContent' > 
    <div class="container ">
  <div class="row">
    <div class="col mt-3">
    <img src={Logosmall}  className="logoSmall" alt="Logo"/>
    <img src={Logo}  className="logo" alt="Logo"/>
    </div>
  </div>
  <div className='row  mt-3' >
    <div className='col mainNav' >
      <div className='row'>
        <div className='col-8' >
        <div className='mainNavHeading mt-5 mx-5' >Events</div>
        <div className='mx-5' >Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra</div>
      </div>
      <div className='col-4' >
      <img src={Event}  className="eventLogo mt-3" alt="Events"/>
     </div>
      </div>
    </div>
  </div>
  <div className='row inputContainer'>
  <div className=' row inputContent align-items-center' >
    <div className='col-7' >
      <span>Search</span>
    <input type="name" class="form-control" onChange={handleChange} />
    </div>
    <div className='col-5' >
    <span>Past Event</span>
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Select Type
  </button>
  <ul class="dropdown-menu">
    <li><button class="dropdown-item" type="button" onClick={() => handleEvent("true")} >True</button></li>
    <li><button class="dropdown-item" type="button" onClick={() => handleEvent("false")}>False</button></li>
  </ul>
</div>
    </div>
  </div>
  </div>

  <div className='row cardContainer' >
    <div>{eventData?.count} Events</div>

    {
      eventData?.events?.map((item) => (
        <div className='col-3 my-3' >
        <div class="card " style={{width: "16rem"}}>
        <img class="card-img-top" src={CardImg} alt="Card image cap"/>
        <div class="card-body">
        <div class="cardHeading mt-3">{item.name}</div>
        <div className='row  mt-2 align-items-center justify-content-center' >
          <div className='col-6 p-0 cardStatus' >
            Raddison Blue</div>
          <div className='col-6 p-0 cardStatus' > {item.is_free === "ture" ? "Free" : "paid"} | {item.is_virtual === "true" ? "Online" : "Offline"}</div>
        </div>
        </div>
      </div>
          </div>

      ))
    }
  </div>
</div>
    </div>
  )
}
