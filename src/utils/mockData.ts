
// Mock User Data
export const mockUsers = [
  { id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'patient' },
  { id: 'u2', name: 'Dr. Sarah Smith', email: 'sarah@example.com', role: 'doctor' },
  { id: 'u3', name: 'Michael Johnson', email: 'michael@example.com', role: 'pharmacy' },
];

// Mock Health Metrics
export const mockHealthMetrics = {
  steps: 8432,
  caloriesBurned: 320,
  heartRate: 72,
  sleep: 7.5,
  weight: 70.5,
  bloodPressure: { systolic: 120, diastolic: 80 },
  bloodGlucose: 95,
};

// Mock Diet Tracking
export const mockMeals = [
  { id: 'm1', name: 'Breakfast', calories: 450, protein: 25, carbs: 55, fat: 12, time: '08:00' },
  { id: 'm2', name: 'Lunch', calories: 650, protein: 35, carbs: 70, fat: 20, time: '13:00' },
  { id: 'm3', name: 'Dinner', calories: 550, protein: 30, carbs: 60, fat: 15, time: '19:00' },
];

// Mock Recipes
export const mockRecipes = [
  {
    id: 'r1',
    name: 'Protein-Packed Greek Yogurt Bowl',
    calories: 320,
    protein: 25,
    carbs: 30,
    fat: 10,
    ingredients: ['Greek yogurt', 'Honey', 'Berries', 'Nuts', 'Granola'],
    instructions: 'Mix all ingredients in a bowl and enjoy!',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38'
  },
  {
    id: 'r2',
    name: 'Grilled Chicken Salad',
    calories: 380,
    protein: 35,
    carbs: 15,
    fat: 20,
    ingredients: ['Chicken breast', 'Mixed greens', 'Tomatoes', 'Cucumber', 'Olive oil', 'Lemon juice'],
    instructions: 'Grill chicken, chop vegetables, mix with dressing.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
  },
  {
    id: 'r3',
    name: 'Salmon with Quinoa',
    calories: 450,
    protein: 30,
    carbs: 35,
    fat: 22,
    ingredients: ['Salmon fillet', 'Quinoa', 'Asparagus', 'Lemon', 'Olive oil', 'Dill'],
    instructions: 'Bake salmon, cook quinoa, steam asparagus, serve together.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288'
  },
  {
    id: 'r4',
    name: 'Vegetarian Buddha Bowl',
    calories: 410,
    protein: 15,
    carbs: 60,
    fat: 16,
    ingredients: ['Chickpeas', 'Brown rice', 'Avocado', 'Sweet potato', 'Kale', 'Tahini'],
    instructions: 'Roast veggies, cook rice, assemble in a bowl with dressing.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
  },
  {
    id: 'r5',
    name: 'Protein Smoothie',
    calories: 280,
    protein: 20,
    carbs: 35,
    fat: 5,
    ingredients: ['Protein powder', 'Banana', 'Spinach', 'Almond milk', 'Chia seeds'],
    instructions: 'Blend all ingredients until smooth.',
    image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82'
  },
];

// Mock Medications
export const mockMedications = [
  {
    id: 'med1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    time: '09:00',
    purpose: 'Blood pressure',
    refill: '2023-05-15',
  },
  {
    id: 'med2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    time: '09:00, 18:00',
    purpose: 'Diabetes',
    refill: '2023-05-20',
  },
  {
    id: 'med3',
    name: 'Vitamin D',
    dosage: '2000 IU',
    frequency: 'Once daily',
    time: '09:00',
    purpose: 'Supplement',
    refill: '2023-06-10',
  },
];

// Mock Doctors
export const mockDoctors = [
  {
    id: 'd1',
    name: 'Dr. Sarah Smith',
    specialty: 'Cardiologist',
    rating: 4.8,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
  },
  {
    id: 'd2',
    name: 'Dr. Robert Johnson',
    specialty: 'Family Medicine',
    rating: 4.6,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
  },
  {
    id: 'd3',
    name: 'Dr. Emily Chen',
    specialty: 'Dermatologist',
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f',
  },
];

// Mock Appointments
export const mockAppointments = [
  {
    id: 'a1',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Smith',
    specialty: 'Cardiologist',
    date: '2023-05-10',
    time: '10:00',
    status: 'Confirmed',
    type: 'In-person',
  },
  {
    id: 'a2',
    doctorId: 'd2',
    doctorName: 'Dr. Robert Johnson',
    specialty: 'Family Medicine',
    date: '2023-05-15',
    time: '14:30',
    status: 'Pending',
    type: 'Virtual',
  },
];

// Mock Doctor Schedule/Availability
export const mockDoctorAvailability = [
  { day: 'Monday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
  { day: 'Tuesday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
  { day: 'Wednesday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
  { day: 'Thursday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
  { day: 'Friday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
];

// Mock Patient Notes
export const mockPatientNotes = [
  {
    id: 'n1',
    patientId: 'u1',
    patientName: 'John Doe',
    date: '2023-05-01',
    notes: 'Patient reports occasional chest pain. Blood pressure slightly elevated. Recommended lifestyle changes and scheduled follow-up in 2 weeks.',
  },
  {
    id: 'n2',
    patientId: 'u1',
    patientName: 'John Doe',
    date: '2023-04-15',
    notes: 'Annual check-up. All vitals normal. Recommended continuing current medication regimen.',
  },
];

// Mock Pharmacy Inventory
export const mockPharmacyInventory = [
  {
    id: 'i1',
    name: 'Lisinopril',
    category: 'Prescription',
    stock: 150,
    price: 12.99,
    reorderLevel: 30,
  },
  {
    id: 'i2',
    name: 'Metformin',
    category: 'Prescription',
    stock: 200,
    price: 15.99,
    reorderLevel: 40,
  },
  {
    id: 'i3',
    name: 'Vitamin D',
    category: 'OTC',
    stock: 80,
    price: 8.99,
    reorderLevel: 20,
  },
  {
    id: 'i4',
    name: 'Ibuprofen',
    category: 'OTC',
    stock: 120,
    price: 6.99,
    reorderLevel: 25,
  },
  {
    id: 'i5',
    name: 'Amoxicillin',
    category: 'Prescription',
    stock: 75,
    price: 20.99,
    reorderLevel: 15,
  },
];

// Mock Pharmacy Orders
export const mockPharmacyOrders = [
  {
    id: 'o1',
    patientId: 'u1',
    patientName: 'John Doe',
    medications: [
      { id: 'i1', name: 'Lisinopril', quantity: 30, price: 12.99 },
    ],
    status: 'Pending',
    date: '2023-05-05',
    total: 12.99,
  },
  {
    id: 'o2',
    patientId: 'u1',
    patientName: 'John Doe',
    medications: [
      { id: 'i2', name: 'Metformin', quantity: 60, price: 15.99 },
      { id: 'i3', name: 'Vitamin D', quantity: 30, price: 8.99 },
    ],
    status: 'Completed',
    date: '2023-04-20',
    total: 24.98,
  },
];
