import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./main_page.css"
import { getRequest,postRequest } from "../../network/network";


const MainPage =() =>{
    const navigate = useNavigate();
    
    const location = useLocation();
    const { from } = location.state || {};

    const [accountType, SetAccountType] = useState([false,false,false,false]);
    const [numberOfItemInCart, setNumberOfItemInCart] = useState(0);
    const [isElderProfile , setIsElderProfile] = useState(from=="elder"?true:false);
    const [isFashionProfile , setIsFashionProfile] = useState(from=="fashionista"?true:false);  
    const [isAthleteProfile , setIsAthleteProfile] = useState(from=="professional_athlete"?true:false);
    const [isDefaultProfile , setIsDefaultProfile] = useState(from=="default"?true:false);
    const [featuresList, setFeatureList] = useState(["Fast", "Slow", "Quick"]);
    const [adsTitle, setAdsTitle] = useState("New Product");


    const selectItem = (item_info) =>{
        const temp = numberOfItemInCart+ 1;
        setNumberOfItemInCart(temp);
    }

    const navigateToViewCart = () =>{
        navigate("/checkout");
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const getUserData = async(email) =>{
        const profile = await getRequest("redis_user_profile",{email}) //Get User Info
        const category = await getUserCategory(profile.response); //Get Category
        const sneaker = await getSneakers(category);
        await getUserAds(profile,category,sneaker); //Get Ads
        console.log("response: ", profile.response.email)
    }

    const getSneakers = async(category) => {

        const response = await getRequest("item_view_filtered",{category}); //Get User Info
        const randomNumber = getRandomInt(0, response.length);
        console.log("Sneaker List: ", response[randomNumber].name);
        return response[randomNumber].name

    }

    const getUserCategory = async(userProfile) =>{

          const response = await postRequest("get_profile_category", userProfile);
          const predicted_category = response.predicted_category;
          console.log("response: ", predicted_category)
          return predicted_category;

    }

    const getUserAds = async(profile, sneaker, category)=>{

        const user_info = {"product_name": `${sneaker}`,
        "age": `${profile.response.age}`,
        "gender": `${profile.response.gender}`,
        "user_profile": `${category}`,
        "location": `${profile.response.location}`,
        "item_bought_in_the_past": "nike_alpha_menace_4_varsity_blue",
        "average_price_of_past_item_bought": 233}
        
        const response = await postRequest("get_new_product_title", user_info);

        const title = response?.Response?.title ?? "New Product";
        const benefits = response?.Response?.benefit ?? ["Fast", "Slow", "Quick"];
        setAdsTitle(title);
        setFeatureList(benefits);

        //console.log("response: ", benefits)
        console.log("response From User Ads: ", profile.response.age)

    }

    useEffect(() =>{
        if(isAthleteProfile){
            getUserData("johnkirk@email.com")
        }
        

    },[isAthleteProfile]);


    useEffect(() =>{
        if(isElderProfile){
            getUserData("glendasoutherns@email.com")
        }
        

    },[isElderProfile])


    useEffect(() =>{
        if(isFashionProfile){
            getUserData("samanthashaw@email.com")
        }
        

    },[isFashionProfile])


    useEffect(() =>{
        if(isDefaultProfile){

        }
    },[isDefaultProfile])

    const elderButton = () =>{
        setIsElderProfile(!isElderProfile);
        setIsDefaultProfile(false);
        setIsFashionProfile(false);
        setIsAthleteProfile(false);
    }


    const athleteButton = () =>{
        setIsElderProfile(false);
        setIsDefaultProfile(false);
        setIsFashionProfile(false);
        setIsAthleteProfile(!isAthleteProfile);
    }


    const fashionButton = () =>{
        setIsElderProfile(false);
        setIsDefaultProfile(false);
        setIsFashionProfile(!isFashionProfile);
        setIsAthleteProfile(false);
    }


    const defaultButton = () =>{
        setIsElderProfile(false);
        setIsDefaultProfile(!isDefaultProfile);
        setIsFashionProfile(false);
        setIsAthleteProfile(false);
    }


    const testData = [{
        name: "Air Jordan 6 Retro - Infrared Salesman",
        available_color: ["black", "green"],
        price: 215.00,
        image: "/air_jordan_1_retro_high_og_gray.png"
    },{
        name: "Sketcher Slip-ins: Go Walk",
        available_color: ["black", "green"],
        price: 120.00,
        image: "/sketchers_max_cushioning_endeavour_athletic_running_black.png"
    },
    {
        name: "Nike Air Max Dn8 Leather",
        available_color: ["black", "green"],
        price: 210.00,
        image: "/nike_air_max_plus_g_white.png"
    },
    {
        name: "Nike Victory 2 Glam",
        available_color: ["black", "green"],
        price: 220.00,
        image: "/nike_vapor_shark_3_purple.png"
    },
    {
        name: "Air Jordan 4 Retro - Pale Ivory and Tough Red",
        available_color: ["black", "green"],
        price: 180.00,
        image: "/air_jordan_mvp_92_green.png"
    },
    {
        name: "Nike Victory",
        available_color: ["black", "green"],
        price: 210.00,
        image: "/nike_maxfly_2_yellow.png"
    }
]



    return(
        <div className="h-screen w-screen">

            <div className="nav-container w-screen">

                    <div className="nav-left nav-item bg-white p-1 rounded-full">
                        <div className="nav-item logo-container">
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
                        </div>
                            {isFashionProfile?<button onClick={fashionButton} className="mr-5 !bg-violet-900 accent-white-text !rounded-full">Fashionista</button>:<button onClick={fashionButton} className="mr-5 !bg-transparent !rounded-full">Fashionista</button>}
                            {isAthleteProfile?<button onClick={athleteButton} className="mr-5 !bg-violet-900 accent-white-text !rounded-full">Professional Athlete</button>:<button onClick={athleteButton} className="mr-5 !bg-transparent !rounded-full">Professional Athlete</button>}
                            {isElderProfile?<button onClick={elderButton} className="mr-5 !bg-violet-900 accent-white-text !rounded-full">Elder</button>:<button onClick={elderButton} className="mr-5 !bg-transparent !rounded-full">Elder</button>}
                            {isDefaultProfile?<button onClick={defaultButton} className="mr-5 !bg-violet-900 accent-white-text !rounded-full">Default</button>:<button onClick={defaultButton} className="mr-5 !bg-transparent !rounded-full">Default</button>}
                    </div>

                    <div className="nav-right nav-item p-1 mr-1">
                        <button className="ml-0 " onClick={navigateToViewCart}>Cart</button>
                        {numberOfItemInCart == 0?null: numberOfItemInCart}
                    </div>

            </div>

            <div className="relative flex bg-gray-300 ads-container w-screen">
                <svg
                    className="absolute circle-svg"
                    width="310"
                    height="310"
                >
                    <circle
                        cx="151"   // x position
                        cy="150"   // y position
                        r="150"     // radius
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                    />

                </svg>
                <div className="absolute title-container">
                    <h1>{adsTitle}</h1>
                </div>
                <div className="absolute feature-container">
                    <div>Feature: {featuresList[0]}, {featuresList[1]}, {featuresList[2]}</div>
                </div>

                <img className="absolute item-svg w-95 h-95 rotate-325" src="/Shoes_Transparent/nike_air_max_dn8_leather_transparent.png"></img>

                <div className="absolute left-20 top-50">
                    <h6>Summer</h6>
                    <h1>Collections</h1>
                </div>


                <div className="w-1/2">
                    <div className="float-nav mt-10">
                    </div>
                </div>
                <div className="w-1/2 bg-violet-900">

                </div>


            </div>
            <div className="flex flex-wrap justify-evenly w-screen mt-5">
                {
                    testData.map((item,index)=>(

                        <div className="w-[325px] h-[575px] m-1 flex-shrink-0" key={index}>
                            <div>
                                <img src={item.image} alt={item.name}></img>
                            </div>
                            <div>{item.name}</div>
                            <div>
                                {item.available_color.map((color,index) =>(
                                    <div>{color}</div>
                                ))}
                            </div>
                            <div>{item.price}</div>
                            <button onClick={() => selectItem(item)}>Add</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );

}

export default MainPage;