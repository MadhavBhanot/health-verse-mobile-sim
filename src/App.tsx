
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleSelection from "./pages/RoleSelection";
import NotFound from "./pages/NotFound";

// Patient Routes
import PatientDashboard from "./pages/patient/Dashboard";
import PatientDiet from "./pages/patient/Diet";
import PatientRecipes from "./pages/patient/Recipes";
import PatientMedications from "./pages/patient/Medications";
import PatientAppointments from "./pages/patient/Appointments";
import PatientMedicineOrder from "./pages/patient/MedicineOrder";

// Doctor Routes
import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorAppointments from "./pages/doctor/Appointments";
import DoctorAvailability from "./pages/doctor/Availability";
import DoctorConsultation from "./pages/doctor/Consultation";
import DoctorPatientNotes from "./pages/doctor/PatientNotes";

// Pharmacy Routes
import PharmacyDashboard from "./pages/pharmacy/Dashboard";
import PharmacyInventory from "./pages/pharmacy/Inventory";
import PharmacyOrders from "./pages/pharmacy/Orders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            
            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/diet" element={<PatientDiet />} />
            <Route path="/patient/recipes" element={<PatientRecipes />} />
            <Route path="/patient/medications" element={<PatientMedications />} />
            <Route path="/patient/appointments" element={<PatientAppointments />} />
            <Route path="/patient/medicine-order" element={<PatientMedicineOrder />} />
            
            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/availability" element={<DoctorAvailability />} />
            <Route path="/doctor/consultation" element={<DoctorConsultation />} />
            <Route path="/doctor/patient-notes" element={<DoctorPatientNotes />} />
            
            {/* Pharmacy Routes */}
            <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} />
            <Route path="/pharmacy/inventory" element={<PharmacyInventory />} />
            <Route path="/pharmacy/orders" element={<PharmacyOrders />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
