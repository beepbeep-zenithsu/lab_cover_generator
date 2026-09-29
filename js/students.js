/* =====================================================================
   students.js  -  the student list
   One student per line:   <9-digit ID> <Full Name>
   To add students later: just add new lines below (keep the backticks).
   Batch/section/group are worked out from the ID by js/app.js (parseId).
   ===================================================================== */
window.DEFAULT_STUDENTS = `
230011102 Khassim Mahamat
230011103 Mohammed Ali Ishag Adam
230011104 Sultan Mahir Muhtasim Arian
230011105 Md. Fahmid Ahmed Chowdhury
230011107 Alam Mohtasim Billah
230011108 Tousif Islam Samin
230011109 Md. Sadat Hossain Arpon
230011110 S M Hassan Imtiaz
230011111 Mahi Akbar
230011112 Raida Binte Royes
230011113 Tahmid Farazi
230011114 Abu Dhorr Ahsan
230011115 Navid Hossain Naim
230011116 Rakin Abrar
230011118 Shahriar Shafin
230011119 Ahnaf Rafid Aurin
230011120 Shaharia Jaman
230011121 Jiyad Rahman
230011122 Adiba Jahan Takia
230011123 Muhtasim Irfan Mahi
230011124 Golam Sadnan Zaman
230011125 Tahjib Ahmed
230011126 Farhan Tajwar Ahmed
230011127 Wasima Aziz
230011128 Nabil Wadud Siam
230011129 Fahad Zarif Dipro
230011130 Adnan Siddique
230011131 Jarif Dhulqarnain
230011132 Inteshar Ahmed Ocean
230011133 Mohammad Abdun Noor
230011134 Md. Abdul Momin Nahin
230011135 Tarafder Md. Mubtasim Nafees
230011136 Abrar Shahriar Niloy
230011137 Shazid Hossain
230011138 Md Arib Bin Abdullah
230011139 Md Minhazur Rahman
230011141 Irfan Bin Mizan
230011142 Taremwa Shakur
230011143 Akib Ashraf Upam
230011144 Nafish Al Akib
230011145 Faiyaaz Ahmed
230011146 Md Yousuf Abdullah
230011147 Md. Al-noman
230011148 Tasfia Tasnim
230011149 Antoiou Ali Moumini
230011150 Mohammad Nadim Hossain
230011152 Salih Mohamed Salih Mohamed
230011153 Mashrafi Sharker
230011155 Md Sajjad Rahman Prodhan
230011156 Md. Farhan Abdullah
230011157 Muhammad Rafid Rubaiyat
230011158 Shihab Rahman Niloy
230011159 Faria Farjana Dia
230011160 Abdullah Al Fahad
230011161 Diarrassouba Habiboulaye
230011201 Mohammad Rafiul Islam
230011202 Md. Maheer Ehsan
230011203 Md. Nakib Shadman
230011204 Irfan Riaz
230011205 Alaaldin Hassan Abbas Ibrahim
230011206 Md. Shadman Sadique
230011208 Tahsinur Rahman
230011209 Md. Shazzad Hossain
230011210 Kazi Saikhur Rahman Raian
230011211 Tahmid Wasi
230011212 Masrura Sara Mohima
230011213 Shaffat Wasee
230011214 Tahsin Reza Barshan
230011215 Manda Samah Henriette
230011216 Mohammad Hasibul Islam
230011217 Tanzim Hassan Reza
230011218 Adib Ishtiaque
230011219 Liazul Islam Lincoln
230011221 Mohammad Nafiur Rabbi
230011222 Ahmad Zawad
230011223 Wadudul Kabir Khan
230011225 Shahriar Tahzin
230011226 Omar Faruk
230011227 Tasnia Basharat Mahi
230011228 Tanvir Kabir
230011229 Md. Hasin Mahtab Rahat
230011230 Nazmus Sakib Towaha
230011231 Ahmed Sayeed Azam
230011232 Abdul Mukit Khan
230011233 Md. Rafsan Rafid
230011234 Muhtasib Hasan Luban
230011235 Mohammad Hasan Muttaki
230011236 Ahmadou Maliki
230011237 Abib Muntasir
230011238 Md. Nafio Khan
230011239 Raghib Hasin Chowdhury
230011240 Fahim Muntashir
230011241 Iram Hasan Raihan
230011242 Hamad Anwar Doudy
230011243 Souleimanou Sadou
230011244 Aboubakar Ibrahim
230011245 Maliha Akter Nilima
230011246 Abdallah Mohammad
230011247 Tahmid Shahriar Samin
230011248 Arshehi Mustafa Arefin
230011249 Lamia Hossain Tahia
230011250 Hasan Ul Akib
230011251 Afik Rahman Ratul
230011252 Mirza Ashraf Hossain
230011253 Masiya Rahman
230011254 Masnoon Tahmid
230011255 Alpha Oumar Diallo
230011256 Tahsin Bin Ahsan
230011257 Aahnaf Marzuk
230011258 Muhammad Nafiz Reza Diganta
230011259 Humayra Shikder Mishty
240011101 Jahin Arham Siddiquee
240011201 Sadia Sreoshi
230012101 Md. Saiduzzaman Tamim
230012102 Mohtasin Fuad
230012103 Atik Murshed
230012104 Muhibul Islam
230012105 Md. Nafidur Rahman Ahmed
230012106 Samit Anjum
230012108 Antara Raisa
230012109 Mohaimen Mohian
230012110 Jishan Nafis Alam
230012111 Mahtab Hossain
230012112 Tanvir Ahasan
230012113 Md. Radowan Siraj
230012114 Muhib Islam
230012115 Fardeen Alam
230012116 Farha Tasneem
230012117 Anisa Islam
230012119 Mustabi Hossain Fardu
230012120 Md. Rifat Hasan
230012121 Raisa Rodoshi
230012122 Al Mahee Muktadeer
230012123 Saleh Mushfiqur Rahman
230012124 S.M. Tawfiqunnabi
230012125 Abida Sultana
230012126 Md. Abdul Muiz
230012129 Taki Tajwoar Shrestha
230012130 Sumaiya Afrin
230012131 Adeeb Ibne Mahabub
230012132 Dhrubo Hridraz
230012133 SM Mobasshir Ismail
230012134 Mohammad Saffan Hossain
230012135 Mouhamadou Moubarak Hamatoukour
230012136 Mubashshira Rahman
230012137 Tasnim Ara Rahma
230012138 Rifat Raihan
230012139 Nooraisha Faizah Mihika
230012140 Al Rakib Fakruddin
230012141 Md. Atiar Rahman
230012142 Rutaba Afnan
230012143 Shafin Mahmud Sifat
230012145 Tasin Ahmed
230012146 Shagufta Afrin
230012148 Ishrak Hossain
230012149 Md. Sazzadul Islam Sujal
230012150 Ahmed Taki Tajwar
230012151 Nahin Feeda
230012152 Fahima Shahreen Hoque
230012153 Fariha Rahman
230012154 Faiza Habib
230012155 Md. Mahid Hasan Sisir
230012156 Md. Ashfaq Rahman Bhuiyan
230012157 Maisha Islamm Nafi
230012158 Mashfique Haider Loy
230012159 Tasin Muhammed Nibir
230012160 Farhan Sadik Abdullah
230012161 Anamul Haq Irfan
230012162 Kazi Wasikur Rahman
230012163 Zaedur Rahman Zarif
230012164 Mahdi Sadat
230012165 Addin Ahmed
230012166 Md. Tajreian Hossain
`;
