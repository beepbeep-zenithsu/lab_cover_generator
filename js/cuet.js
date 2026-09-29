/* =====================================================================
   cuet.js  -  MANUAL mode: Chittagong University of Engineering & Technology
   Registers one university into window.MANUAL_UNIS. To add another
   university later, copy this file, change the data, and add a <script>
   line for it in index.html (before app.js).

   Positions are in the cover image's own pixel grid (720 x 1005):
   [x, y]  x = left edge of the text, y = vertical centre.
   ===================================================================== */
window.MANUAL_UNIS = window.MANUAL_UNIS || {};

window.MANUAL_UNIS.cuet = {
  name: "CUET",
  full: "Chittagong University of Engineering & Technology",
  dept: "Mechanical Engineering",
  subtitle: "Chittagong University of Engineering & Technology \u00b7 Dept. of Mechanical Engineering",
  correctionEmail: "rafiulislam@iut-dhaka.edu",   /* where "Request Information Correction" emails go */
  idLength: 7,          /* e.g. 2303001 = batch 23, dept 03, roll 001 */
  rollFrom: 4,          /* roll number = digits from this position */
  idHint: "e.g. 2303001",

  /* Section / lab-group rules (by roll number). Both are still editable on the page.
       1-60   = A  (1-30 = A1,   31-60  = A2)
       61-120 = B  (61-90 = B1,  91-120 = B2)
       121+   = C  (121-150 = C1, the rest = C2)                                  */
  sectionFor: roll => roll <= 60 ? "A" : roll <= 120 ? "B" : "C",
  groupFor: roll => roll <= 30 ? "A1" : roll <= 60 ? "A2" : roll <= 90 ? "B1" : roll <= 120 ? "B2" : roll <= 150 ? "C1" : "C2",

  /* One student per line:  <7-digit ID> <Full Name>  (from the 23-batch roll sheet) */
  students: `
2303001 Niloy Ahmmed
2303002 Abdullah Al-Ferdous Omi
2303003 Supratim Chowdhury
2303004 Mysha Chowdhury
2303005 Atkia Islam
2303006 Mrenmoy Kumar Datta
2303007 Md. Mahtab Ahmed
2303008 Titonko Datta
2303009 Md. Sabir Hossain
2303010 Debangshu Sengupta
2303011 Ahmad Shawal
2303012 Sabrina Mahfuz
2303013 Aditya Barua
2303014 Tajrian Ahasan Adnan
2303015 Purnima Saha
2303016 Raihan Uddin
2303017 Md. Nasimul Islam Badhon
2303018 Tarif
2303019 Sidratul Yeasin Anmun
2303020 Shovon Dhar
2303021 Amir-Ul Kuddus Chowdhury
2303022 Tanbir Hossain Siam
2303023 Bijoy Barua
2303024 Asir Awsaf
2303025 Farhan Tanvir Mahmood
2303026 Abdullah Md. Nihad
2303027 Md. Hasnain
2303028 Saad Zulkar Nain
2303029 Rabiul Islam
2303030 Md. Shahidul Islam Patwary
2303031 Saif Ahammed
2303032 Tithi Chakraborty
2303033 Aninda Chowdhury
2303034 Md Tanzimul Arfan
2303035 Tamim Hasan
2303036 Md. Sakir Hossan
2303037 Md. Rakin Mahdin
2303038 Faisal Mahmud
2303039 Mohammed Irfan Sadeque
2303040 Julkifal Abedin Chowdhury
2303041 Abir Ahmed
2303042 Md. Tuhin Hossain Robin
2303043 Sarker Adib Ahammed
2303044 Twabeeb Wasitwa Bhuiyan
2303045 Md. Nasimul Haque
2303046 Shahir Ahmed Sadeque
2303047 Mynul Islam Rafi
2303048 Kazi Mazharul Islam
2303049 Taquiya Binte Jamir Luba
2303050 Abdul Wazid
2303051 Md. Noman Alam Khandaker
2303052 Md. Nayem Hossain
2303053 Towki Fardin Chowdhury
2303054 Md. Shahriar Hossan Siam
2303055 Aiman Afia
2303056 Md. Safiur Rahman
2303057 Md. Faiyaz Islam
2303058 S. M. Tazbir Hossen
2303059 Joy Sarkar
2303060 Md. Nazrul Islam Fahad
2303061 Tanjim Ul Karim
2303062 Sheikh Mohammad Al Amin
2303063 Hasan Reduanullah
2303064 Mohammad Rafiur Rahman
2303065 Dipa Mollick
2303066 Md. Abu Taleb
2303067 Kiran Barua Eku
2303068 Miftahul Jannat Tanha
2303069 Toufeeq Ahmed
2303070 Majedul Islam
2303071 Md. Ismail Majumder
2303072 Athoy Saha
2303073 Avijit Mohajon
2303074 Rohit Kumar Nath
2303075 Nusaiba Shibly
2303076 Iftekhar Ahmed Sohan
2303077 Jubaer Rahman
2303078 Abrar Bin Hossain
2303079 Md. Asraful Hasan Burhan
2303080 Rakibul Hoque
2303081 Ifteakar Ahmed Fuad
2303082 Aniruddah Banik
2303083 Pranob Mallick
2303084 Md Zafor Sadik
2303085 Kazi Md. Siam Al Sogir
2303086 Ahmad Safwan Sami
2303087 Md. Abdus Sami Bhuiyan
2303088 Tasbi Hasan Arnob
2303089 Md. Mehadi Hasan
2303090 Oveth Hasan Ove
2303091 Esbat Uddin
2303092 Ahnaf Tajwar
2303093 Tahmid Kabir Chowdhury
2303094 Iftekhar Hossain
2303095 Fairoz Montasir
2303096 Md. Jakaria Imtiaz Zihan
2303097 Md. Fahim Shikder
2303098 Mofasser Hossain Chowdhury
2303099 Md. Mashrafee Chowdhury
2303100 Jubair Hossain Fuad
2303101 A. B. M. Abdullah Al Maruf
2303102 Tusar Naser Abdullah
2303103 Md. Jobayed-Ull-Haque
2303104 Md. Shakib
2303105 Md. Irteza Ibne Alam
2303106 Tanvirul Alam
2303107 Tapash Paul
2303108 Zawad Ibn Atiq
2303109 Salman Bin Shams
2303110 Saikat Barua
2303111 Chaity Rani Sarker
2303112 Mehrab Islam Dip
2303113 Sadia Afrin Moury
2303114 Kowshik Das Bishal
2303115 Hurayra Or Rashid
2303116 Chowdhury Mahin Mahmud
2303117 Sampod Bhoumik
2303118 Md. Mahamudul Hasan Jisan
2303119 Anik Hasan Niloy
2303120 Aditya Das
2303121 Ommey Saba
2303122 Md. Merajul Islam
2303123 Tahsin Shahadat
2303124 Md. Nazmul Hasan Bhuiyan
2303125 Yuvoraj Paul Bishal
2303126 Md. Ashik Mondol
2303127 Samiul Hossen Rishan
2303128 Jannatul Ferdouse Mim
2303129 Md Imam Hossain Rakib
2303130 Debasmita Chowdhury
2303131 Md. Mohidul Islam
2303132 Abu Raihan
2303133 S. M. Mahamudul Hasan
2303134 Mohammed Ehsanur Rahman
2303135 Priyanti Biswas
2303136 Sondip Talukder Sony
2303137 Kazi Miftahul Hoque
2303138 Md. Elan Noor
2303139 Muhidul Islam Khan
2303140 Md. Yousuf Hasan Efty
2303141 Md. Misbah Uddin
2303142 Md. Hafizur Rahman
2303143 Ahakamul Islam Nur
2303144 Anupom Paul Nirob
2303145 Shakhawat Hossain Shojib
2303146 Md. Shahriar Hosain Nihad
2303147 Mahima Hosen
2303148 Motasim Billah Al Tirtha
2303149 Mezbah Ul Hasan
2303150 Mohammad Jawad Hasnine
2303151 Aritro Roy
2303152 Promit Debnath
2303153 Md. Ariful Islam
2303154 Prapti Barua Purba
2303155 Humayra Tamanna
2303156 Imrul Imtiaz Ovi
2303157 Surajit Banik Aurghou
2303158 Bishowjeet Ray
2303159 Nafiur Rahman Eulad
2303160 Sananda Chakraborty
2303161 Ayman Kalam
2303162 Mirazur Rahman
2303163 Md. Labib Walid Talha
2303164 Akib Neamat Ullah
2303165 Nabil Sinha Bhuiyan
2303166 Sameenuddin Ahmed
2303167 Md. Asif Hasan
2303168 Md. Shahriar Nayeem Zishan
2303169 Kirti Barua
2303170 Md. Nazrul Islam
2303171 Mahmodol Hasan
2303172 Joyeta Dey
2303173 Tawsif Abrar Nafis
2303174 Md. Nizam Uddin
2303175 Jannatul Jaman Jasi
2303176 Amir Md Minhaz Mahir
2303177 Sarwar Jahan
2303178 Md Mohosen Alam Sybal
2303179 Kohinur Ahmmed
2303180 Asif Al Mahfuz
2303181 Avhik Chakma
`,

  courses: [
    {
      id: "cuet-thermo", code: "ME 212", name: "Thermodynamics Sessional", fields: "cuet",
      title: "Thermodynamics Sessional",
      level: "2", term: "1",                  /* default Level / Term (editable on the page) */
      submitDays: 7,                          /* default submission = performance + 7 days */
      a4: true,                               /* stretch to exact A4 in the PDF */
      tpl: "assets/templates/cuet-cover.jpg", pageW: 720, pageH: 1005,
      fontSize: 18,
      font: "'Times New Roman',Times,'Liberation Serif',serif",
      /* "Name of the experiment/report" box: [left, top, right, bottom] + start font size */
      tbox: [82, 410, 645, 548], tboxSize: 30,
      pos: {
        no:  [322, 597], ct: [322, 629], en: [322, 661], dop: [322, 693], dos: [322, 726],
        nm:  [452, 766], roll: [452, 798], lv: [452, 831], tm: [452, 863], sc: [452, 895], gp: [452, 927]
      },
      /* Titles follow the headings in the ME 212 sessional sheet (Rana Sir). */
      exps: [
        "Determination of Calorific value by bomb calorimeter",
        "Measurement of viscosity of lubricants (Calibration of thermocouple)",
        "Distillation of petroleum fuel",
        "Determination of flash and fire point of fuel",
        "Determination of specific humidity, relative humidity and dew point",
        "Determination of volatile materials and moisture content in coal",
        "Analysis of exhaust gas by Orsat apparatus",
        "Usage and calibration of various speed and wind velocity measuring instruments",
        "Experiments on heat pump and Air cooler"
      ]
    }
  ]
};
