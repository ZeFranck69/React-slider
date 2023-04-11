import { useState } from 'react'
import './Slider.css'
import dataSlider from './dataSlider'
import BtnSlider from './BtnSlider'

export default function Slider() {

    const [ slideAnimation, setSlideAnimation ] = useState({
        index : 1, 
        inProgress : false
    })

    const nextSlide = () => {
        if( slideAnimation.index !== dataSlider.length && !slideAnimation.inProgress ){
            setSlideAnimation({ index: slideAnimation.index + 1, inProgress : true })
            setTimeout(() => {
                setSlideAnimation({index: slideAnimation.index + 1, inProgress: false})
            }, 500)
        }
        else if( slideAnimation.index === dataSlider.length && !slideAnimation.inProgress){
            setSlideAnimation({ index: 1, inProgress : true })
            setTimeout(() => {
                setSlideAnimation({index: 1, inProgress: false})
            }, 500)
        }
    }
    const prevSlide = () => {
        if( slideAnimation.index !== 1 && !slideAnimation.inProgress){
            setSlideAnimation({ index: slideAnimation.index - 1, inProgress : true })
            setTimeout(() => {
                setSlideAnimation({ index: slideAnimation.index - 1, inProgress: false })
            }, 500)
        }
        else if( slideAnimation.index === 1 && !slideAnimation.inProgress){
            setSlideAnimation({ index: dataSlider.length, inProgress : true })
            setTimeout(() => {
                setSlideAnimation({index: dataSlider.length, inProgress: false})
            }, 500)
        }
    }

    const moveDot = index => {
        setSlideAnimation({ index: index, inProgress : false })
    }

    return (
        <div className='container-slider'>
            { dataSlider.map((obj, index) => {
                return(
                    <div
                        key={obj.id}
                        className={ slideAnimation.index === index + 1 ? "slide active-anim" : "slide" }
                    >
                        <img src={ process.env.PUBLIC_URL + `/Imgs/img${index+1}.jpg` } alt="" />
                        {/* <img src={ `/Imgs/img${index+1}.jpg` } alt="" /> */}
                    </div>
                )
            }) }
            <BtnSlider moveSlide = { nextSlide } direction={ "next" } />
            <BtnSlider moveSlide = { prevSlide } direction={ "prev" }/>
            
            <div className="container-dots">
                {Array.from({ length: dataSlider.length}).map((item, index) => {
                    return <div 
                    className={slideAnimation.index === index + 1 ? "dot active" : "dot" }
                    onClick={ () => moveDot(index +1)} 
                    >

                    </div>
                })}
            </div>
        </div>
    )
}
