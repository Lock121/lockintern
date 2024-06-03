<template>

    <layout-div> 
      
              <div id="join-flow">
                <div class="page-wrapper">
                 <div class="card">
                  <img
              class="logo"
              src="https://is.diab.com.vn/logo.png"
            />
                     <div class="card-body">
                 
                         <form>
                             <p v-if="Object.keys(validationErrors).length != 0" class='text-center '><small class='text-danger'>Incorrect Email or Password</small></p>
                             <div class="mb-3">
                                 <label 
                                     htmlFor="sessionName"
                                     class="form-label">
                                     Session Name
                                 </label>
                                 <input 
                                     v-model="sessionName"
                                     type="sessionName"
                                     class="form-control"
                                     id="sessionName"
                                     name="sessionName" 
                                 />
                             </div>
                             <div class="d-grid gap-2">
                                 <button 
                                     :disabled="!isSessionNameValid || isSubmitting"
                                     @click="loginAction()"
                                     type="button"
                                     class="btn btn-primary btn-block">Login<i class="bi bi-box-arrow-in-right"></i>
                                    </button>
                             </div>
                         </form>
                     </div>
                 </div>
         <div id='sessionContainer'></div>

        </div>
              
        <img
               class="left_img"
               src="https://is.diab.com.vn/left-img.png"
             />
      </div>
   
        
    </layout-div>

       
 </template>
   
<script>
 import LayoutDiv from '../LayoutDiv.vue';
 import uitoolkit from "@zoom/videosdk-ui-toolkit";
 import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css'

 var sessionContainer
 var config = {
      videoSDKJWT: '',
      sessionName: 'Cool',
      userName: 'user123',
      sessionPasscode: '1',
      features: ['video', 'audio', 'settings', 'users', 'chat', 'share']
  };
 var role = 1
 function joinSession() {
    uitoolkit.joinSession(sessionContainer, config)
    uitoolkit.onSessionClosed(sessionClosed)
  }

  var sessionClosed = (() => {
    console.log('session closed')
    uitoolkit.closeSession(sessionContainer)

    document.getElementById('join-flow').style.display = 'block'
  })
 export default {
   name: 'LoginPage',
   components: {
     LayoutDiv,
   },
   data() {
     return {
        sessionName: '',
        validationErrors:{},
        isSubmitting:false,
     };
   },
computed: {
  isSessionNameValid() {
    return this.sessionName.trim().length > 0;
  }
},
 created() {
    if(localStorage.getItem('signature') != "" && localStorage.getItem('signature') != null){
        // this.$router.push('/dashboard')
    }
 },


 methods: {      
      loginAction() {
         this.isSubmitting = true
         let payload = {
            sessionName: this.sessionName,
            role: role,
         }
         sessionContainer = document.getElementById('sessionContainer');
      const joinFlowElement = document.getElementById('join-flow');
      if (joinFlowElement) {
        joinFlowElement.style.display = 'none';
      }
         fetch('http://localhost:4000', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(payload)
         })
         .then(response => response.json())
         .then(data => {
           if (data.signature) {
             localStorage.setItem('signature', data.signature);
             config.videoSDKJWT = data.signature;
            console.log(data);
             joinSession();
          
           } else {
             console.log(data);
           }
           return data;
         })
           .catch(error => {
             this.isSubmitting = false
            if (error.response.data.errors != undefined) {
                 this.validationErrors = error.response.data.errors
             }
             if (error.response.data.error != undefined) {
                 this.validationErrors = error.response.data.error
             }
             return error
           });

  },
   },
 };
 </script>
<style>
.logo {
  width: 100px;
  height: auto; 
  margin: 0 auto;
}
.page-wrapper {
  position: fixed;  
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://is.diab.com.vn/background.png');
  background-repeat: no-repeat;
  background-position: right bottom;
}
.left_img {
  position: fixed;  
  top: 0; 
  left: 0; 
  width: auto;
  height: 100%;
  object-fit: contain;
  object-position: left center;
}
.card {
  border: none;
  margin-left: 418px;
  margin-top: 218px;
  display: flex;
  justify-content: center;
  align-items: center; 
}
</style>