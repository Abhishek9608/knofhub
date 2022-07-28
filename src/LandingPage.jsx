import React, { useEffect, useState } from 'react';
import "./LandingPage.css";
import Logo from "./image/Logo.png";
import Logosmall from "./image/Logosmall.png";
import Event from "./image/Events.png"
import CardImg from "./image/CardImg.png";
import DangerCircle from "./image/DangerCircle.png";
import Podium from "./image/podium.png"
import CardSmallImg from "./image/CardSmallImg.png";
import InputSearch from "./image/InputSearch.png"

export default function LandingPage() {
  const [eventData , setEventData] = useState();
  const [inputValue , setInputValue] = useState("");
  const [pastEvent , setPastEvent] = useState("true");
  const [limit , setLimit] = useState(10);


  useEffect(() => {
    fetch(`https://manage-api.konfhub.com/hosted-events?limit=${limit}&search_query=${inputValue}&past_events=${pastEvent}`)
      .then((response) => response?.json())
      .then((result) => {
         setEventData(result);
      })
      .catch((error) => {
        console.log(error)
      })

  },[inputValue , pastEvent , limit]);

  

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleEvent = (EventType) => {
    setPastEvent(EventType)
  }

  const handleLoadMore = () => {
    setLimit(limit + 12)
  }


  return (
    <div className='wholeContent' > 
    <div className="container">
  <div className="row">
    <div className="col mt-3">
    <img src={Logosmall}  className="logoSmall" alt="Logo"/>
    <img src={Logo}  className="logo" alt="Logo"/>
    </div>
  </div>
  <div className='row  mt-3' >
    <div className='col mainNav' >
      <div className='row'>
        <div className='col-lg-8 col-sm-8 col-12' >
        <div className='mainNavHeading mt-5 mx-5' >Events</div>
        <div className='mx-5' >Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra</div>
      </div>
      <div className='col-lg-4 col-sm-4 col-12' >
      <img src={Event}  className="eventLogo mt-5" alt="Events"/>
     </div>
      </div>
    </div>
  </div>
  <div className='row inputContainer'>
  <div className=' row inputContent align-items-center' >
    <div className='col-7 searchContainer' >
      <span>Search</span>
    <input type="name" className="form-control border customSearch" onChange={handleChange} />
    <img src={InputSearch}  className="searchIcon" alt="search"/>
    </div>
    <div className='col-5' >
    <span>Past Event</span>
    <div className="dropdown">
  <button className="btn border w-100  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Select Type
  </button>
  <ul className="dropdown-menu">
    <li><button className="dropdown-item" type="button" onClick={() => handleEvent("true")} >True</button></li>
    <li><button className="dropdown-item" type="button" onClick={() => handleEvent("false")}>False</button></li>
  </ul>
</div>
    </div>
  </div>
  </div>

  <div className='row cardContainer' >
    <h4 >{eventData?.count} Events</h4>

    {
      eventData?.events?.map((item) => (
        <div className='col-sm-4 col-12 col-lg-3 my-3 d-flex align-items-center justify-content-center' key={item.event_id}>
        <div className="card customCard">
        
        <img className="upperImg" src={CardSmallImg} alt="Card image cap"/>
        <img className="card-img-top" src={CardImg} alt="Card image cap"/>
        <div className="card-body">
        <div className="cardHeading mt-3">{item.name}</div>
        <div className='row  mt-2 align-items-center justify-content-center' >
          <div className='col-6 cardStatus' >
          <span><img src={Podium}   alt="Events"/></span>
            Raddison Blue</div>
          <div className='col-6 cardStatus' > 
          <span><img src={DangerCircle}   alt="Events"/></span>
          {item.is_free === "ture" ? "Free" : "paid"} | {item.is_virtual === "true" ? "Online" : "Offline"}</div>
        </div>
        </div>
      </div>
          </div>

      ))
    }
  </div>

  <div className='row loadMoreContainer  align-items-center' >
    <div className='col-5 border-top  createBorder'  ></div>
    <div className='col-2 d-flex justify-content-center' ><button type="button" className="btn btn-outline-secondary loadButton  " onClick={handleLoadMore} > Load More</button></div>
    <div className='col-5 border-top createBorder' ></div>
  </div>
</div>
    </div>
  )
}
