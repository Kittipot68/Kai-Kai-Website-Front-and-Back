import React, { useState, useEffect  } from "react";
 
import { useNavigate } from 'react-router-dom';
 
export default function Login() {
    const naviget = useNavigate();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
 
    useEffect(() => {
        let login = localStorage.getItem("login");
        if(login){
            naviget("/dashboard");
        }
        let loginStatus = localStorage.getItem("loginStatus");
        if(loginStatus){
            setError(loginStatus);
            setTimeout(function(){
                localStorage.clear();
                window.location.reload();
            }, 3000);
        }
        setTimeout(function(){
            setMsg("");
        }, 5000);
    }, [msg]);
 
    const handleInputChange = (e, type) => {
        switch(type){
            case "user":
                setError("");
                setUser(e.target.value);
                if(e.target.value === ""){
                    setError("Username has left blank");
                }
                break;
            case "pass":
                setError("");
                setPass(e.target.value);
                if(e.target.value === ""){
                    setError("Password has left blank");
                }
                break;
            default:
        }
    }
 
    function loginSubmit(){
        if(user !== "" && pass != ""){
            var url = "https://sungroup.co.th/sungroup/Php-Api/login.php";
            var headers = {
                "Accept": "application/json",
                "Content-type": "application/json"
            };
            var Data = {
                user: user,
                pass: pass
            };
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(Data)
            }).then((response) => response.json())
            .then((response) => {
                console.log(response);
                if(response[0].result === "Invalid username!" || response[0].result === "Invalid password!"){
                    setError(response[0].result);
                }
                else{
                    setMsg(response[0].result);
                    setTimeout(function(){
                        localStorage.setItem("login", true);
                        localStorage.setItem('user', user);
                        naviget("/HomeBackend");
                    }, 2000);
                }
            }).catch((err) => {
                setError(err);
                console.log(err);
            })
        }
        else{
            setError("All field are required!")
        }
    }
    return(
      <section className="min-h-screen flex items-center justify-center bg-pink-500">
  <div className="bg-white rounded-lg p-8 md:p-10 w-full max-w-md">
    <p className={error !== "" ? 'text-red-500' : 'text-green-500'}><b>{error !== "" ? error : msg}</b></p>

    <h5 className="font-semibold text-2xl mb-3 pb-3">Sign into your account</h5>

    <div className="mb-4">
      <input 
        type="text"
        id="username"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        value={user}
        onChange={(e) => handleInputChange(e, "user")}
        placeholder="User Name"
      />
    </div>

    <div className="mb-4">
      <input 
        type="password"
        id="pass"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        value={pass}
        onChange={(e) => handleInputChange(e, "pass")}
        placeholder="Password"
      />
    </div>

    <div className="mb-4">
      <button 
        type="submit"
        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-gray-600"
        onClick={loginSubmit}
      >
        Login
      </button>
    </div>
  </div>
</section>

    )
}