import LoginForm from "./form/login_form";
import entrepreneurImg from "../../assets/entrepreneur.jpg"
import "./login_page.css"




const LoginPage =() =>{

    return(
        <div className="flex w-screen h-screen">

            <div className="w-[60%]relative flex h-screen">
                <img src={entrepreneurImg} alt="entrepreneur" />
                <div className="absolute top-left-container">
                    <h1>SuperAds</h1>
                </div>
                <div className="absolute bottom-left-container-top">
                    <h1>“A simple tool that transformed our business.”</h1>
                </div>
                <div className="absolute bottom-left-container-bottom">
                    <h1>Jaden Schmuzey</h1>
                    <p>Chief Executive Officer</p>
                </div>
            </div>

            <div className="pl-30 w-[20%] flex items-center h-screen">
                <div className="">
                    <h2 className="text-4xl font-bold text-black" >Welcome back to SuperAds</h2>
                    <p className="text-1xl">Build your design system effortlessly with our powerful component library.</p>
                    <LoginForm/>
                </div>
            </div>
        </div>
    );

}

export default LoginPage;