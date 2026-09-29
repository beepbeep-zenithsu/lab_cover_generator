/* =====================================================================
   config.js  -  the only file with settings you will ever need to touch
   (besides students.js and courses.js)
   ===================================================================== */

window.APP_CONFIG = {

  /* The one email address allowed to open the Admin panel. */
  ADMIN_EMAIL: "rafiulislam@iut-dhaka.edu",

  /* Where "Request Information Correction" emails go. */
  CORRECTION_EMAIL: "rafiulislam@iut-dhaka.edu",

  /* Admin sign-in link / code is valid for this many seconds. */
  OTP_SECONDS: 120,


  /* Departments: the 5th-6th digits of a Student ID */
  DEPTS: {
    "11": {
      dept: "Mechanical and Production Engineering (MPE)",
      prog: "BSc in Mechanical Engineering"
    },

    "12": {
      dept: "Industrial and Production Engineering",
      prog: "BSc in Industrial and Production Engineering"
    }
  },


  /* ---------------------------------------------------------------
     FIREBASE CONFIGURATION
     --------------------------------------------------------------- */

  FIREBASE: {
    apiKey: "AIzaSyCXmB5_e1vL1KjTV6S43gD7bWSfNycMvM",
    authDomain: "iut-lab-cover.firebaseapp.com",
    projectId: "iut-lab-cover",
    appId: "1:694199782173:web:5c4f015ed0df08d5286ff4"
  },


  /* ---------------------------------------------------------------
     EMAILJS FALLBACK
     Used only when Firebase is not available.
     --------------------------------------------------------------- */

  EMAILJS: {
    SERVICE_ID: "",
    TEMPLATE_ID: "",
    PUBLIC_KEY: ""
  }

};