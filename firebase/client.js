import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA--_cz--MrvGkVsDugZweSSTkfm8VOZdU",
  authDomain: "devtter-87986.firebaseapp.com",
  projectId: "devtter-87986",
  storageBucket: "devtter-87986.appspot.com",
  messagingSenderId: "187997665697",
  appId: "1:187997665697:web:926306772f8fe80582f3e0",
  measurementId: "G-9LQGQGF7JP",
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

// const addUser = ({ displayName, email, uid }) => {
//   return db.collection("users").add({
//     username: displayName,
//     email,
//     id: uid,
//   })
// }

const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    id: uid,
    email,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}

export const logout = () => {
  return firebase.auth().signOut()
}

export const addDevit = ({
  avatar,
  content,
  userName,
  userId,
  img,
  file,
  fileName,
  fileSize,
  email,
}) => {
  const capitalizarPrimeraLetra = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  const setSearchParam = (param) => {
    const caseSearchList = []
    let templ = ""
    for (let i = 0; i < param.length; i++) {
      templ = templ + "" + param[i]
      caseSearchList.push(templ)
    }
    return caseSearchList
  }

  return db.collection("devits").add({
    avatar,
    content,
    img,
    file,
    fileName,
    fileSize,
    userName,
    userId,
    email,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
    infoName: userName.split(""),
    infoContent: setSearchParam(content)
      .concat(content.split(""))
      .concat(content.split(" "))
      .concat(content.toLowerCase().split(""))
      .concat(content.toUpperCase().split(""))
      .concat(capitalizarPrimeraLetra(content).split(""))
      .concat(content.toLowerCase().split(" "))
      .concat(content.toUpperCase().split(" "))
      .concat(capitalizarPrimeraLetra(content).split(" "))
      .concat(setSearchParam(content.toLowerCase()))
      .concat(setSearchParam(content.toUpperCase()))
      .concat(setSearchParam(capitalizarPrimeraLetra(content))),
  })
}

const mapDevitfromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const 
  
  
  
  
  
  
  { createdAt } = data

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  }
}

export const listenLatestDevits = (handleNewDevits) => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .limit(50) // con esto se puede limitar los archivos a leer
    .onSnapshot((snapshot) => {
      const newDevits = snapshot.docs.map(mapDevitfromFirebaseToDevitObject)
      handleNewDevits(newDevits)
    })
}

export const fetchYouDevits = (username) => {
  return db
    .collection("devits")
    .where("userName", "==", username)
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => {
      return snapshot.docs.map(mapDevitfromFirebaseToDevitObject)
    })
}

// export const fetchUsers = (username) => {
//   return db
//     .collection("users")
//     .where("username", ">=", username)
//     .orderBy("username", "asc")
//     .get()
//     .then((snapshot) => {
//       return snapshot.docs.map((doc) => {
//         const data = doc.data()
//         console.log(data)

//         return {
//           ...data,
//         }
//       })
//     })
// }

export const fetchDevitsFromSearch = (username) => {
  return db
    .collection("devits")
    .where("infoContent", "array-contains", username)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map(mapDevitfromFirebaseToDevitObject)
    })
}

// export const fetchLatestDevits = () => {
//   return db
//     .collection("devits")
//     .orderBy("createdAt", "desc")
//     .get()
//     .then((snapshot) => {
//       return snapshot.docs.map(mapDevitfromFirebaseToDevitObject)
//     })
// }

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}

export const uploadFile = (file) => {
  const refFile = firebase.storage().ref(`files/${file.name}`)
  const taskFile = refFile.put(file)
  return taskFile
}
