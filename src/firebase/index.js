import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD7ENwDM7FlarXz1jCAnulT91Mqbf39-UE",
  authDomain: "head-tracker-413e9.firebaseapp.com",
  projectId: "head-tracker-413e9",
  storageBucket: "head-tracker-413e9.appspot.com",
  messagingSenderId: "14683859563",
  appId: "1:14683859563:web:a061d65c015fbe111edf2e"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
    db
}