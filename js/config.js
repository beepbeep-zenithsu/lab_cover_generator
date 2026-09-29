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

  /* Departments: the 5th-6th digits of a Student ID (e.g. 23 00 11 201 -> "11"). */
  DEPTS: {
    "11": { dept: "Mechanical and Production Engineering (MPE)", prog: "BSc in Mechanical Engineering" },
    "12": { dept: "Industrial and Production Engineering",        prog: "BSc in Industrial and Production Engineering" }
  },

  /* ---------------------------------------------------------------
     OPTION A (recommended, real security): FIREBASE
     Follow README.md -> "Step 2: Firebase". Paste your Firebase web-app
     config here. Leave it as null to run without Firebase.
     With Firebase:
       - the admin sign-in link is emailed to ADMIN_EMAIL by Google,
       - only that email can write data (enforced by the server rules),
       - student list / course edits are saved online and visible to
         everybody, no re-publishing needed.
     --------------------------------------------------------------- */
  FIREBASE: null
  /* Example:
  FIREBASE: {
    apiKey: "AIza...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    appId: "1:1234567890:web:abcdef"
  }
  */,

  /* ---------------------------------------------------------------
     OPTION B (fallback, no backend): EMAILJS one-time code
     Only used when FIREBASE is null. Edits then stay in the browser
     that made them (localStorage), so a bypass can't harm anyone else.
     Fill these in (see README.md -> "EmailJS") to get a 6-digit code
     emailed to ADMIN_EMAIL.
     --------------------------------------------------------------- */
  EMAILJS: { SERVICE_ID: "", TEMPLATE_ID: "", PUBLIC_KEY: "" }
};
