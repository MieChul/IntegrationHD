
// Select the database to use.
use('HealthDeskDb');
// Switch to the HealthDeskDb database
// db.Users.updateOne(
//     { 
//         _id: ObjectId("677de5efad485d59dd0922fd"), 
//         "user_roles.role": 4 // Match the specific role in the array
//     }, 
//     { 
//         $set: { "user_roles.$.role": 3,  "Email": "admin@admin.com" } // Use $ to update the matched array element
//     }
// );

// Fetch the Id of the Admin user (role: 3) from db.Users
const adminUser = "677de5efad485d59dd0922fd"
if (!adminUser) {
    throw new Error("Admin user with role 3 not found in db.Users.");
}
const adminId = adminUser._id;

// Create BodySystem collection and insert data
db.createCollection("BodySystem");
db.BodySystem.insertMany([
    { Id: ObjectId(), Name: "Cardiovascular system (CVS)", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Respiratory system (RS)", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Central Nervous System (CNS)", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Gastro-intestitinal system (GI)", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Musculoskeletal system", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Lymphatic system", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Endocrine system", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Ear nose throat (ENT)", CreatedBy: adminId, CreateDate: new Date() }
]);

// Create DosageForm collection and insert data
db.createCollection("DosageForm");
db.DosageForm.insertMany([
    { Id: ObjectId(), Name: "TABLET", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "CAPSULE", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "POWDER", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "DUSTING POWDER", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "CREAM", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "PASTE", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "GEL", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "SUPPOSITORY", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "SYRUP", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "SOLUTION", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "EMULSION", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "SUSPENSION", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "INHALER", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "AEROSOL", CreatedBy: adminId, CreateDate: new Date() }
]);

// Create DrugsFrequency collection and insert data
db.createCollection("DrugsFrequency");
db.DrugsFrequency.insertMany([
    { Id: ObjectId(), Name: "Once a day", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Twice a day", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Thrice a day", CreatedBy: adminId, CreateDate: new Date() }
]);

// Create Vaccine collection and insert data
db.createCollection("Vaccine");
db.Vaccine.insertMany([
    { Id: ObjectId(), Name: "MMR Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "DTaP Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Inactivated Poliovirus Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Hepatitis A Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Hepatitis B Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Hib Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Varicella Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "PCV13 (Pneumococcal Conjugate Vaccine)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Rotavirus Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Influenza Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "HPV Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "MenACWY (Meningococcal Conjugate Vaccine)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Shingles Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "BCG (Bacille Calmette-Guerin) Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Japanese Encephalitis Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Rabies Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Typhoid Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Yellow Fever Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Cholera Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Hepatitis E Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Tick-borne Encephalitis Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Vaccinia", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Anthrax Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Dengvaxia", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Ebola Vaccine (rVSV-ZEBOV)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "RSV Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "E. coli Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Malaria Vaccine (RTS,S/AS01)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Q Fever Vaccine (Q-Vax)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Plague Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "CMV Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Rift Valley Fever Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Venezuelan Equine Encephalitis Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Hantavirus Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Lassa Fever Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Marburg Virus Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "MERS Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Crimean-Congo Hemorrhagic Fever Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Tularemia Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Lymphatic Filariasis Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Schistosomiasis Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "West Nile Virus Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Norovirus Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "C. difficile Vaccine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Zika Virus Vaccine", CreatedBy: "adminId", CreateDate: new Date() }
]);

// Create AdministrationRoute collection and insert data
db.createCollection("AdministrationRoute");
db.AdministrationRoutes.insertMany([
    { Id: ObjectId(), Name: "TOPICAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INHALATION", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "RECTAL/VAGINAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "AURICULAR", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "ORAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "SUBLINGUAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "BUCCAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "SUBCUTANEOUS", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRAVENOUS", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRAMUSCULAR", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRACARDIAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRAARTERIAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRADERMAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTERSTITIAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRA-ABDOMINAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRA-AMNIOTIC", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRABILIARY", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRABRONCHIAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRACARTILAGINOUS", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRACAUDAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRACAVERNOUS", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRACORONARY", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRADISCAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRADUCTAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRADURAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRAEPIDERMAL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "INTRAGASTRIC", CreatedBy: "adminId", CreateDate: new Date() }
]);

// Create Investigation collection and insert data
db.createCollection("Investigation");
db.Investigation.insertMany([
    { Id: ObjectId(), Name: "Alanine Aminotransferase (ALT)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Albumin", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Alkaline Phosphatase (ALP)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Alpha-fetoprotein (AFP)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Ammonia", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Amylase", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Aspartate Aminotransferase (AST)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Bilirubin, Total", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Bilirubin, Direct", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Blood Urea Nitrogen (BUN)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Calcium", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Carbon Dioxide (CO2)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Chloride", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Cholesterol, Total", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Cholesterol, HDL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Cholesterol, LDL", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "C-Reactive Protein (CRP)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Creatinine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "D-Dimer", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Erythrocyte Sedimentation Rate (ESR)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Ferritin", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Fibrinogen", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Folate", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Gamma-Glutamyl Transferase (GGT)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Glucose", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Hematocrit", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Hemoglobin", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Homocysteine", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Iron", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Lactate Dehydrogenase (LDH)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Lipase", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Magnesium", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Mean Corpuscular Hemoglobin (MCH)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Mean Corpuscular Hemoglobin Concentration (MCHC)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Mean Corpuscular Volume (MCV)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Phosphate", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Platelet Count", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Potassium", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Prostate-Specific Antigen (PSA)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Protein, Total", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Red Blood Cell Count (RBC)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Reticulocyte Count", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Sodium", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Transferrin", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Troponin", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Troponin T", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Uric Acid", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Vitamin B12", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Vitamin D", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "White Blood Cell Count (WBC)", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Fasting Blood Sugar", CreatedBy: "adminId", CreateDate: new Date() },
    { Id: ObjectId(), Name: "Thyroid Stimulating Hormone (TSH ULTRASENSITIVE)", CreatedBy: "adminId", CreateDate: new Date() }
]);

// Create Symptoms collection
db.createCollection("Symptoms");

// Insert unique symptoms
db.Symptoms.insertMany([
    { Id: ObjectId(), Name: "Abdominal Pain", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Acid Reflux", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Airsickness", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Bad Breath", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Bleeding", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Breathing Problems", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Bruises", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Chest Pain", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Choking", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Chronic Pain", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Constipation", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Cough", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Dehydration", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Diarrhea", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Dizziness and Vertigo", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Dysfunctional Uterine Bleeding", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Edema", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Fainting", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Fatigue", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Fever", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Frostbite", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Gas", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Gastrointestinal Bleeding", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Headache", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Heartburn", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Heat Illness", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Hives", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Hypothermia", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Indigestion", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Itching", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Jaundice", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Motion Sickness", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Nausea and Vomiting", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Pain", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Pelvic Pain", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Rare Diseases", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Raynaud's Disease", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Sciatica", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Speech and Communication Disorders", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Stuttering", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Swelling", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Tachypnea", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Tension Headache", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Vaginal Bleeding", CreatedBy: adminId, CreateDate: new Date() },
    { Id: ObjectId(), Name: "Vertigo", CreatedBy: adminId, CreateDate: new Date() }
]);