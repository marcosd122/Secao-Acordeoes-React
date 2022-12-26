import React from "react"

const Accordion = ({título, active, setActive}) => {
  return (
    <div className="accordion">
        <div className="accordionHeading">
            <div className="container">
                <p>{título}</p>
                <span onClick={() => setActive(título)}>
                    {active === título ? "X" : "|||" } 
                    
                </span>
            </div>
        </div>
        <div className={(active === título ? "show" : "") + " accordionContent" }>        
        
            <div className="container">
            
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, assumenda corrupti? Pariatur laboriosam, voluptas officia in corrupti perspiciatis fugiat repellendus ullam! Quibusdam expedita quo iusto in optio eaque nostrum assumenda?</p>                
            </div>
            
        </div>
    </div>
    
    
  )
}

export default Accordion;
