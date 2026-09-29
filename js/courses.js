/* =====================================================================
   courses.js  -  all courses, experiments, teachers and text positions

   HOW TO ADD A NEW COURSE (copy an existing block and edit it):
     1. Put the cover image in  assets/templates/  (JPG, A4 ratio).
     2. Add a block to the array below.

   Fields
     id, code, name   : shown in the dropdown
     fontSize         : (optional) size of the printed values, default 12
     fields           : "full"  -> Experiment no., title, dates, teacher, name,
                                   ID, dept, programme, group are all printed
                        "basic" -> only name, ID, programme, group are printed
     tpl              : ONE cover image for every experiment ...
     tplByExp         : ... or a list of 6 (one per experiment) as in Fluid
     pos              : where each value is printed, in PDF points
                        [x, y]  (x = left edge of text, y = vertical centre;
                        A4 page = 595 x 842). Use posByExp for per-experiment.
     exps             : experiment titles (index 0 = Experiment 1)
     restByExp        : (optional) PDF with the rest of the report for each
                        experiment. Enables the "Download Lab Report" button.
     routine          : (optional) day of week (0=Sun ... 6=Sat) + teachers,
                        by department code and section, used to auto-fill
                        "Date of Performance" and "Submitted To".
                        Department codes: "11" = ME, "12" = IPE.
                        Sections: A, B  (or "*" = every section).
   ===================================================================== */

/* Text positions shared by the three "full" covers (MoM, Material, Thermo). */
const FULL_POS = {
  en:  [216.6, 214.6],  t:   [235.0, 247.8],  dop: [218.9, 280.6],
  dos: [210.1, 313.5],  sub: [167.3, 346.6],  nm:  [272.5, 387.4],
  sid: [306.7, 420.6],  dp:  [318.1, 453.5],  pr:  [315.0, 486.3],
  gp:  [305.3, 519.5]
};

/* Fluid covers: the experiment number & title are already printed on the
   cover, so only these four values are added. Heights differ per cover. */
const FLUID_X = { nm: 128.3, sid: 167.7, pr: 166.4, gp: 160.9 };
const fluidPos = (a, b, c, d) => ({
  nm: [FLUID_X.nm, a], sid: [FLUID_X.sid, b], pr: [FLUID_X.pr, c], gp: [FLUID_X.gp, d]
});

/* New IPE courses reuse the Mechanics of Materials cover (mom.jpg). The printed
   course code and course name are covered with a patch and redrawn from the
   course's own `code` and `name`. All numbers are pixels of the 1654 x 2339 image. */
const MOM_OVERLAY = {
  w: 1654,
  pill:  { box: [640, 325, 1010, 405], color: "#860001", text: "#ffffff", cx: 825, cy: 363, size: 64 },
  title: { box: [150, 425, 1500, 505], color: "#ffffff", text: "#40221f", cx: 825, cy: 460, size: 60, maxW: 1350 }
};
/* Same layout as MoM; only the day / teachers differ. */
const ipeCourse = (id, code, name, day, teachers, exps) => ({
  id, code, name, fields: "full", depts: ["12"],
  tpl: "assets/templates/mom.jpg", pageW: 595.2, pageH: 841.92, pos: FULL_POS,
  overlay: MOM_OVERLAY, exps,
  routine: { "12": { "*": { day, t: teachers } } }
});

window.DEFAULT_COURSES = [
  {
    id: "mom", code: "ME 4404", name: "Mechanics of Materials Lab", fields: "full",
    tpl: "assets/templates/mom.jpg", pageW: 595.2, pageH: 841.92, pos: FULL_POS,
    exps: [
      "Torsion Test of metal specimen",
      "Tensile Test of Metal Specimen",
      "Bending Moment in a simply supported beam",
      "Deflection of a simply supported beam for different materials",
      "Determination of critical load in columns with different end conditions",
      "Deflection of a Leaf Spring"
    ],
    routine: {
      "11": {
        A: { day: 1, t: "Ms. Sumaiya Jannat Esha (Mam) & Mr. Ifat Ovi (Sir)" },
        B: { day: 5, t: "Mr. Ifat Ovi (Sir) & Ms. Sumaiya Jannat Esha (Mam)" }
      },
      "12": { "*": { day: 3, t: "Dr. Mehedi Hassan (Sir) & Mr. Tanvir Hossain (Sir)" } }
    }
  },

  {
    id: "material", code: "ME 4326", name: "Material Engineering Lab", fields: "full",
    tpl: "assets/templates/material.jpg", pageW: 595.2, pageH: 841.92, pos: FULL_POS,
    exps: [
      "Study of the Iron-Iron Carbide Phase Diagram",
      "Measurement of Dimensions, Mass, Volume and Density of different materials",
      "Preparation of specimens for microscopic analysis",
      "Quantitative and Qualitative Analysis of Microstructure Development of Steel",
      "Study of crystal structures using ball models",
      "Tensile Test of a metal specimen"
    ],
    routine: {
      "11": {
        A: { day: 5, t: "Dr. Md. Saiful Islam (Sir) & Dr. Md. Abu Shaid Sujon (Sir)" },
        B: { day: 5, t: "Dr. Md. Saiful Islam (Sir) & Mr. Md. Hasibur Rahman Hamim (Sir)" }
      }
    }
  },

  {
    id: "thermo", code: "ME 4306", name: "Basic Thermodynamics Lab", fields: "full",
    tpl: "assets/templates/thermo.jpg", pageW: 595.2, pageH: 841.92, pos: FULL_POS,
    exps: [
      "Determination of viscosity of fluid using a viscometer",
      "Calibration of thermocouples",
      "Calibration of pressure gauge by Dead Weight Tester",
      "Determination of calorific value of fuel using a bomb calorimeter",
      "Study of a petrol engine",
      "Study of a diesel engine"
    ],
    routine: {
      "11": {
        A: { day: 4, t: "Mr. Sifat Abdul Bari (Sir) & Mr. Mahdi Hafiz Nabil (Sir)" },
        B: { day: 4, t: "Mr. Sifat Abdul Bari (Sir) & Mr. Mahdi Hafiz Nabil (Sir)" }
      }
    }
  },

  {
    id: "fluid", code: "ME 4412", name: "Fluid Mechanics I Lab", fields: "basic",
    pageW: 595.32, pageH: 841.92, fontSize: 14,
    font: "'Palatino Linotype','Book Antiqua',Palatino,Georgia,'Times New Roman',serif",
    exps: [
      "Determination of the location of the Center of Pressure for a Submerged Plane Surface",
      "Verification of Bernoulli's Equation",
      "Study of Pipe Friction",
      "Flow through a notch weir",
      "Study of impact of Jet",
      "Measurement of Airfoil Drag Coefficient"
    ],
    tplByExp: [1, 2, 3, 4, 5, 6].map(n => `assets/templates/fluid${n}.jpg`),
    restByExp: [1, 2, 3, 4, 5, 6].map(n => `assets/fluid-rest/fluid${n}-rest.pdf`),
    posByExp: [
      fluidPos(489.0, 519.1, 571.7, 601.9),   /* Experiment 1 */
      fluidPos(436.6, 466.7, 496.9, 527.2),   /* Experiment 2 */
      fluidPos(466.7, 496.8, 549.4, 579.6),   /* Experiment 3 */
      fluidPos(466.7, 496.8, 549.4, 579.6),   /* Experiment 4 */
      fluidPos(436.6, 466.7, 519.2, 549.5),   /* Experiment 5 */
      fluidPos(486.2, 516.4, 546.6, 576.8)    /* Experiment 6 */
    ],
    /* The Fluid cover has no "Submitted To" line, so this is not printed on it;
       kept here so the teacher / day info is not lost. */
    routine: {
      "11": {
        A: { day: 2, t: "Dr. Muhammad Rizwanur Rahman (Sir) & Mr. Sefat Mahmud Siddique (Sir)" },
        B: { day: 5, t: "Dr. Muhammad Rizwanur Rahman (Sir) & Mr. Sefat Mahmud Siddique (Sir)" }
      }
    }
  },

  /* ---------- IPE-only courses (shown only to IPE students) ---------- */
  ipeCourse("ipe4304", "IPE 4304", "Manufacturing Processes I Lab", 4,   /* Thursday */
    "Ms. Fahmida Tabassum Bristy (Mam) & Mr. Imrul Kayes (Sir)",
    ["Casting Process Practice", "Grinding Process Practice", "Gas Welding Practice", "Fabrication Practice"]),

  ipeCourse("ipe4404", "IPE 4404", "Manufacturing Processes II Lab", 5,   /* Friday */
    "Ms. Sharmin Akter Urmee (Mam) & Mr. Imrul Kayes (Sir)",
    ["Study of Indexing Method and Manufacturing of a Spur Gear on a Milling Machine",
     "Preparation of a Tensile Test Specimen",
     "Study of Injection Moulding Machine",
     "Study of Electrical Discharge Machine",
     "Study of CNC Drilling Machine"]),

  ipeCourse("me4354", "ME 4354", "Thermodynamics and Heat Transfer Lab", 2,   /* Tuesday */
    "Mr. Imrul Kayes (Sir)",
    ["Calibration of Thermocouples",
     "Determination of calorific value of fuel using bomb calorimeter",
     "Determination of Thermal Conductivity of a Metal Bar using Linear Heat Conduction",
     "Study of construction and working principles of boiler",
     "Study of a petrol engine",
     "Study of a Diesel engine",
     "Study the performance of parallel flow in plate heat exchanger"])
];
