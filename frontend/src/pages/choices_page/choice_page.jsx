import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import './choice_page.css'


const ChoicePage =() =>{
    const navigate = useNavigate();



    const handleFormSubmission = (current_page) =>{
        navigate("/store",{
            state:{
                from: current_page
            }
        });
    }


    return(
        <div className=" w-screen h-screen">
            <div className="top-left-container">
                <svg
                    className="svg-container"
                    width="60"
                    height="60"
                        >
                        {/* Line */}
                        <line
                            x1="10"
                            y1="40"
                            x2="40"
                            y2="10"
                            stroke="#370ACE"
                            strokeWidth="2"
                            transform="rotate(85 25 25)"
                        />
                        <circle
                            cx="10"   // x position
                            cy="40"   // y position
                            r="10"     // radius
                            fill="#370ACE"
                        />


                        <circle
                            cx="40"   // x position
                            cy="10"   // y position
                            r="10"     // radius
                            fill="#370ACE"
                        />

                </svg>
                <h2  className="top-left-container-title">SuperAds</h2>
            </div>

            <div className="flex items-center justify-center h-full">
                <div className="w-1/4 h-2/5 m-2">
                    <div onClick={()=>handleFormSubmission('professional_athlete')}  className="p-5 rounded-lg w-4/4 h-5/5 bg-gradient-to-b from-violet-900 to-violet-950 accent-white-text opacity-[.85]">
                        <div>
                            Name: John Kirk
                        </div>
                        <div>
                            Age: 28
                        </div>
                        <div>
                            Favorite Color: Red
                        </div>
                        <div>
                            Interest: U.S Olympic Track Athlete
                        </div>
                    </div>
                    <p>Professional Athlete</p>
                </div>
                <div className="w-1/4 h-2/5 m-2">
                    <div className="p-5 rounded-lg  w-4/4 h-5/5 bg-gradient-to-b from-violet-900 to-violet-950 accent-white-text opacity-[.85]" onClick={()=>handleFormSubmission('fashionista')}>
                        <div>
                            Name: Samantha Shaw
                        </div>
                        <div>
                            Age: 32
                        </div>
                        <div>
                            Favorite Color: Blue
                        </div>
                        <div>
                            Interest: Clothes, Shopping, and custom jewerly
                        </div>

                    </div>
                    <p>Fashionista</p>
                </div>
                <div className="w-1/4 h-2/5 m-2">
                    <div className="p-5 rounded-lg  w-4/4 h-5/5 bg-gradient-to-b from-violet-900 to-violet-950 accent-white-text opacity-[.85]" onClick={()=>handleFormSubmission('elder')}>
                        <div>
                            Name: Glenda
                        </div>
                        <div>
                            Age: 62
                        </div>
                        <div>
                            Favorite Color: Yellow
                        </div>
                        <div>
                            Interest: Kniting, Cats
                        </div>
                    </div>
                    <p>Elder</p>
                </div>
                <div className="w-1/4 h-2/5 m-2">
                    <div className="rounded-lg w-4/4 h-5/5 bg-gradient-to-b from-violet-900 to-violet-950 accent-white-text opacity-[.85]" onClick={()=>handleFormSubmission('default')}>
                    </div>
                    <p>Default</p>
                </div>
            </div>
        </div>
    );

}

export default ChoicePage;