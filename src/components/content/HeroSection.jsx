import HeroReady from "./items/HeroReady";


const HeroSection = () => {

  return (
    <div className="mt-[6.5rem]">
      <div className="bg-hero"> 
        <img 
          className="absolute bottom-[14%] md:-bottom-[2rem] right-0 pointer-events-none"
          src="/images/tear.svg"
          alt="tear paper"
        />
        <div className="hero-ready1">
          <HeroReady />
        </div>
      </div>
      <div className="flex flex-col items-center sm:hidden">    
        <HeroReady /> 
      </div> 
    </div>
  )
}

export default HeroSection;