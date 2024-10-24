// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import { getDatabase,get,ref } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbUhWmNbPbGTqfhF5WVIRLrwkkRqW0UX0",
  authDomain: "fireblog-88ed9.firebaseapp.com",
  projectId: "fireblog-88ed9",
  storageBucket: "fireblog-88ed9.appspot.com",
  messagingSenderId: "897038342408",
  appId: "1:897038342408:web:35ed8e0ece7c284b3074bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getDatabase(app)



   /* -----------Get data from firebase databade ----------- */

   function getPostData(){
    const user_ref = ref(db,'post/')
    get(user_ref).then((snapshot)=>{
      const data = snapshot.val()
  
      let html = "";
      const table = document.querySelector('.main')
      for(const key in data){
        const {title,post_content,image} = data[key]
  
        html += `
       <div class="post">
       <h2>${title}</h2>
       <p>
       ${post_content}
       </p>
       <img src=${image}>
       
       </div>
         `
      }
  
      table.innerHTML = html
      
    })
  }
  
  getPostData()



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
// // import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
// import { getDatabase,set,ref,get,remove,update } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAbUhWmNbPbGTqfhF5WVIRLrwkkRqW0UX0",
//   authDomain: "fireblog-88ed9.firebaseapp.com",
//   projectId: "fireblog-88ed9",
//   storageBucket: "fireblog-88ed9.appspot.com",
//   messagingSenderId: "897038342408",
//   appId: "1:897038342408:web:35ed8e0ece7c284b3074bd"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // const auth = getAuth(app)
// const db = getDatabase(app)

// const my_blog = document.querySelector('.my_blog')




 





//    /* -----------Get data from firebase databade ----------- */

//    function getPostData(){
//     const user_ref = ref(db,'post/')
//     get(user_ref).then((snapshot)=>{
//       const data = snapshot.val()
  
//       let html = "";
//       const table = document.querySelector('table')
//       for(const key in data){
//         const {title,post_content} = data[key]
  
//         html += `
//         <tr>
//           <td><span class="postNumber"></span></td>
//           <td> ${title} </td>
//           <td> <button class="delete" onclick="delete_data(${key})">Delete</button> </td>
//           <td> <button class="update" onclick="update_data(${key})">Update</button> </td>
//         </tr>
//          `
//       }
  
//       table.innerHTML = html
      
//     })
//   }
  
//   getPostData()
