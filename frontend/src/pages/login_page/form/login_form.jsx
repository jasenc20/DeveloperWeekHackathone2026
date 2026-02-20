import { useNavigate } from "react-router-dom";
import './login_form.css';



const LoginForm =() =>{
    const navigate = useNavigate();



    const handleFormSubmission = () =>{
        navigate("/choice");
    }


    return(
        <>
        <form>
            <div className="relative w-70 container-item">
                <input
                    type="email"
                    id="email"
                    placeholder=" "
                    className="
                    peer w-full border border-gray-300 rounded-lg px-3 
                    pt-5 pb-2 text-sm focus:outline-none focus:border-blue-500"
                />

                <label
                    htmlFor="email"
                    className="
                    absolute left-3 top-2 text-gray-500 text-sm transition-all 
                            peer-placeholder-shown:top-3.5 
                            peer-placeholder-shown:text-base 
                            peer-placeholder-shown:text-gray-400
                            peer-focus:top-1
                            peer-focus:text-sm 
                            peer-focus:text-blue-500"
                >
                    Email
                </label>
            </div>
            <div className="relative w-70 container-item">
                <input
                    type="password"
                    id="password"
                    placeholder=" "
                    className="
                    peer w-full border border-gray-300 rounded-lg px-3 
                    pt-5 pb-2 text-sm focus:outline-none focus:border-blue-500"
                />

                <label
                    htmlFor="password"
                    className="
                    absolute left-3 top-2 text-gray-500 text-sm transition-all 
                            peer-placeholder-shown:top-3.5 
                            peer-placeholder-shown:text-base 
                            peer-placeholder-shown:text-gray-400
                            peer-focus:top-1
                            peer-focus:text-sm 
                            peer-focus:text-blue-500"
                >
                    Password
                </label>
            </div>
            <div className="pb-5">
                <p className="accent-color">Forgot Password?</p>
            </div>
            <div className="w-70">
                    <button className="w-full accent-background accent-white-text" onClick={handleFormSubmission} type="submit">Login</button>
            </div>
            </form>
        </>
    );

}

export default LoginForm;