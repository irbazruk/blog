// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase,set,ref,get,remove,update } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
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

const auth = getAuth(app)
const db = getDatabase(app)

const my_blog = document.querySelector('.my_blog')
const login_page = document.querySelector('.login')

onAuthStateChanged(auth,(user)=>{
    if(user){
        my_blog.classList.add('show')
        login_page.classList.add('hide')
    } else {
        my_blog.classList.remove('show')
        login_page.classList.remove('hide')
    }
  })


function SignInUser(){
   
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword (auth,email,password).then((userCredinals)=>{
        console.log(userCredinals.user.uid);
        
    })
  }

  const sign_btn = document.querySelector('#sign_in')
  sign_btn.addEventListener('click',SignInUser)

  // sign out logout

  const sign_out_btn = document.querySelector('#Logout')
  sign_out_btn.addEventListener('click',()=>{
      signOut(auth).then(()=>{
          //
      }).catch((error)=>{
          console.log("error" + error);
      })
  })

   /* --------------------- blog section ------------------ */

   const notify = document.querySelector('.notify')

   const add_post_btn = document.querySelector('#post_btn')

   function Add_post(){
     const title = document.querySelector('#title').value;
     const image = document.querySelector('#image').value;
     const post_content = document.querySelector('#post_content').value;
     const id = Math.floor(Math.random()*100)

     set(ref(db,'post/' + id),{
       title : title,
       image:image,
       post_content : post_content
     })

     notify.innerHTML = "data added"
     document.querySelector('#title').value = "";
     document.querySelector('#image').value = "";
     document.querySelector('#post_content').value = "";
     

     getPostData()
   }

   add_post_btn.addEventListener('click',Add_post)

    /* -----------Get data from firebase databade ----------- */

function getPostData(){
  const user_ref = ref(db,'post/')
  get(user_ref).then((snapshot)=>{
    const data = snapshot.val()

    let html = "";
    const table = document.querySelector('table')
    for(const key in data){
      const {title,post_content,image} = data[key]

      html += `
      <tr>
        <td><span class="postNumber"></span></td>
        <td> ${title} </td>
        <td>${image}</td>
        <td> <button class="delete" onclick="delete_data(${key})">Delete</button> </td>
        <td> <button class="update" onclick="update_data(${key})">Update</button> </td>
      </tr>
       `
    }

    table.innerHTML = html
    
  })
}

getPostData()

/* ----  delete data ------ */

window.delete_data = function(key){
    remove(ref(db,`post/${key}`))
    notify.innerHTML = "Data Deleted"
    getPostData()
  }
  
  /* ----  Get and Update data ------ */

  window.update_data = function(key){
    const user_ref = ref(db,`post/${key}`)
  
  
    get(user_ref).then((item)=>{
      document.querySelector('#title').value = item.val().title;
      document.querySelector('#image').value = item.val().image;
     document.querySelector('#post_content').value = item.val().post_content;
    })


      const update_btn = document.querySelector('.update_btn')
      update_btn.classList.add('show')
      document.querySelector('.post_btn').classList.add('hide')
    
  /* ---- Update ------ */

    function Update_Form(){
     const title = document.querySelector('#title').value;
     const image = document.querySelector('#image').value;
    const post_content = document.querySelector('#post_content').value;
      //  console.log(title)
      //  console.log(post_content)
      update(ref(db,`post/${key}`),{
        title:title,
        post_content:post_content,
        image:image
      })
      

      // const update_btn = document.querySelector('.update_btn')
      // update_btn.classList.('show')
      document.querySelector('.post_btn').classList.remove('hide')
      document.querySelector('.update_btn').classList.remove('show')


    notify.innerHTML = "data Updated"
    // document.querySelector('#title').value = "";
    //  document.querySelector('#post_content').value = "";
    getPostData()

    }

    

    // add_post_btn.addEventListener('click',Add_post)

    update_btn.addEventListener('click',Update_Form)

}