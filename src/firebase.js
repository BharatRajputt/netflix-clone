// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyClNHdyYERjrmkxVzdsz8aKTFVfl2kpFAI",
  authDomain: "netflix-clone-384d6.firebaseapp.com",
  projectId: "netflix-clone-384d6",
  storageBucket: "netflix-clone-384d6.appspot.com",
  messagingSenderId: "776585140704",
  appId: "1:776585140704:web:0e6a71966652eac1777385",
  measurementId: "G-LYCM1MTVDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)


const signup = async(name,email,password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth,email,password)

       const user = res.user;
       await addDoc(collection(db, "user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       })

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))

    }

}

const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))    }
}

const logout = () =>{
    signOut(auth)
}

export {auth,db,login,signup,logout};