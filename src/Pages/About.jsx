import React from 'react'
import AboutAward from '../Component/About/AboutAward'
import Accreditations from '../Component/About/Accreditations'
import DetailAbout from '../Component/About/DetailAbout'
import VisionMission from '../Component/Home/6_VisionMission'
function About() {
  return (
    <div>
      <div><DetailAbout /></div>
    {/* <div><AboutDetail /></div> */}
    <div><VisionMission /></div>
<div className='  p-10 '>
    <div><Accreditations /></div>

    <div><AboutAward /></div>

    </div>
    </div>

  )
}

export default About