import { useState } from "react";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import {useSpringCarousel} from "react-spring-carousel-js";

const items = [
  {
    id: 'item-1',
    renderItem: <Slide src="srit_youtube.webp" heading={"Welcome to our campus"} description={"Sri Ram Institute of Science and Technology, Jabalpur"}/>,
  },
  {
    id: 'item-2',
    renderItem: <Slide src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" heading={"Web Development Workshop"} description={"Web development classes starting from 15th April."}/>,
  },
  {
    id: 'item-3',
    renderItem: <Slide src="https://images.unsplash.com/photo-1635775017492-1eb935a082a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" heading={"C++ Workshop"} description={"C++ Master Class starting from 1 April"}/>,
  }
];

function Slide(props) {
	return (
	<div className="h-[500px] relative w-full overflow-hidden after:h-full after:w-full after:absolute after:opacity-30 after:top-0 after:bg-gradient-to-t after:from-black after:block">
		<img src={props.src} className="pointer-events-none object-cover h-[500px] w-full"/>
		<div className="md:block absolute bottom-6 text-white z-10 px-3 text-center w-full">
        <h5 className="text-xl font-medium">{props.heading}</h5>
        <p>{props.description}</p>
    </div>
	</div>
	)
}



function Slidecrousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
 

  const { carouselFragment, slideToItem } = useSpringCarousel({
    items
  })
  const handleNext = () => {
    const nextIndex = (currentIndex + 1 ) % items.length;
    setCurrentIndex(nextIndex);
    slideToItem(items[nextIndex].id);
  };
  
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
    slideToItem(items[prevIndex].id);
  };

  return (
		<div className="relative">
			<button className="hidden md:flex items-center justify-center left-0 z-10 top-0 absolute text-transparent hover:bg-black hover:bg-opacity-10 hover:text-white h-full w-24" onClick={handlePrev}><FiArrowLeft className="transition-all ease-in-out" size={24}/></button>
			{carouselFragment}
			<button className="hidden md:flex items-center justify-center right-0 z-10 top-0 absolute text-transparent hover:bg-black hover:bg-opacity-10 hover:text-white h-full w-24" onClick={handleNext}><FiArrowRight className="transition-all ease-in-out" size={24}/></button>
		</div>
	);
}

export default Slidecrousel;
