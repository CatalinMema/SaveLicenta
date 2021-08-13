import React from 'react'
import { SiBbciplayer } from 'react-icons/si';
import { auth,provider} from '../../firebase';
import './style.css';
function Login() {
    const signIn = e => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((error)=>alert(error.message));

    }
    return (
        <div className="login"> 
            <div className="inner_container">
                <SiBbciplayer size={50} className="imageLogo" />
                <h1> Sign in</h1>
                <hr/>
                <button className="butonLogin" onClick={signIn}>
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}

export default Login
