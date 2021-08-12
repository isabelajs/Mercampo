import React, {useState, useRef, useCallback, useEffect} from 'react';

// import '../../assets/styles/componentes/generales/Carousel.scss'
import '../../assets/styles/generales/Carousel.scss'

export default function CarouselCategories ({children,widthItems = 200}){

  const [visibilityArrowLeft, setVisibilityArrowLeft] = useState(false)
	const [visibilityArrowRight, setVisibilityArrowRight] = useState(false)
  const refCategoriesContainer = useRef()
  
  const visibilityArrows =  useCallback(()=>{

    const realScrollWidth = refCategoriesContainer.current.scrollWidth - refCategoriesContainer.current.offsetWidth

    refCategoriesContainer.current.scrollLeft > 0 ? setVisibilityArrowLeft(true) : setVisibilityArrowLeft(false)

    refCategoriesContainer.current.scrollLeft < realScrollWidth ? setVisibilityArrowRight(true) : setVisibilityArrowRight(false)

	},[])

  const moveLeftScroll = useCallback(()=>{
		refCategoriesContainer.current.scrollLeft -= widthItems
	},[])

	const moveRightScroll = useCallback(()=>{

		refCategoriesContainer.current.scrollLeft += widthItems
	},[])


  useEffect(()=>{	

		visibilityArrows()

		window.addEventListener('resize',visibilityArrows)
		
		return ( ()=> window.removeEventListener('resize',visibilityArrows) )

  // eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

  return(
    <div className="c-carousel">

      <div className='carousel__buttons--arrow'>

        { visibilityArrowLeft && <div className='arrow arrow--previous' onClick={moveLeftScroll}>
          <svg  width="7" height="15" viewBox="0 0 7 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.00665 14.9981C6.23834 14.9986 6.46287 14.9116 6.64128 14.7522C6.74169 14.6624 6.82468 14.5522 6.88552 14.4278C6.94636 14.3035 6.98384 14.1674 6.99581 14.0273C7.00779 13.8873 6.99402 13.7461 6.9553 13.6118C6.91659 13.4776 6.85368 13.3528 6.77019 13.2448L2.32779 7.51466L6.61153 1.77382C6.6939 1.66447 6.75541 1.53865 6.79253 1.40358C6.82964 1.26852 6.84163 1.12688 6.82781 0.986799C6.81399 0.846722 6.77463 0.710971 6.71198 0.587349C6.64934 0.463727 6.56465 0.354671 6.46279 0.266449C6.36019 0.169126 6.24004 0.0957163 6.10988 0.0508276C5.97972 0.0059389 5.84236 -0.00945949 5.70641 0.00559807C5.57047 0.0206556 5.43888 0.0658444 5.31991 0.138329C5.20093 0.210813 5.09714 0.309027 5.01504 0.426808L0.225578 6.84116C0.079731 7.03244 0 7.27239 0 7.52001C0 7.76763 0.079731 8.00757 0.225578 8.19886L5.18361 14.6132C5.28309 14.7426 5.40945 14.8448 5.55245 14.9117C5.69545 14.9786 5.85106 15.0082 6.00665 14.9981Z" fill="black"/>
          </svg>
        </div>

        }
      
        {visibilityArrowRight &&  <div className="arrow arrow--next" onClick={moveRightScroll}>
          <svg  width="7" height="15" viewBox="0 0 7 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.993352 14.9981C0.761661 14.9986 0.537126 14.9116 0.358724 14.7522C0.258315 14.6624 0.175316 14.5522 0.114479 14.4278C0.0536416 14.3035 0.0161625 14.1674 0.00418798 14.0273C-0.00778654 13.8873 0.00597897 13.7461 0.0446958 13.6118C0.0834126 13.4776 0.146319 13.3528 0.229814 13.2448L4.67221 7.51466L0.388472 1.77382C0.306104 1.66447 0.244592 1.53865 0.207475 1.40358C0.170357 1.26852 0.158365 1.12688 0.172187 0.986799C0.186009 0.846722 0.225373 0.710971 0.288017 0.587349C0.35066 0.463727 0.435349 0.354671 0.537213 0.266449C0.639811 0.169126 0.75996 0.0957163 0.89012 0.0508276C1.02028 0.0059389 1.15764 -0.00945949 1.29359 0.00559807C1.42953 0.0206556 1.56112 0.0658444 1.68009 0.138329C1.79907 0.210813 1.90286 0.309027 1.98496 0.426808L6.77442 6.84116C6.92027 7.03244 7 7.27239 7 7.52001C7 7.76763 6.92027 8.00757 6.77442 8.19886L1.81639 14.6132C1.71691 14.7426 1.59055 14.8448 1.44755 14.9117C1.30455 14.9786 1.14894 15.0082 0.993352 14.9981Z" fill="black"/>
          </svg>
        </div>}

      </div>

      <div className='carousel__items' ref={refCategoriesContainer} onScroll={visibilityArrows}>

        {children}

      </div>
    </div>
  )

//  
}




