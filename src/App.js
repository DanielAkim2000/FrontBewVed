import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import ApprenantPage from "./pages/apprenant.page";
import Home from "./pages/home.page";
import GroupePage from "./pages/groupe.page";
import FormationPage from "./pages/formation.page";
import AddFormation from "./pages/addFormation.page";
import AddGroupe from "./pages/addGroupe.page";
import AddApprenant from "./pages/addApprenant.page";
import DetailsFormation from "./pages/detailsFormation.page";
import AddApprenantInFormation from "./pages/addApprenantInFormation";
import ModifApprenant from "./pages/modifApprenant.page";
import ModifFormation from "./pages/modifFormation.page";
import AddFormateur from "./pages/addFormateur.page";
import FormateurPage from "./pages/formateur.page";
import ModifFormateur from "./pages/modifFormateur.page";
import PromotionPage from "./pages/promotion.page";
import AddPromotion from "./pages/addPromotion.page";
import ModifPromotion from "./pages/modifPromotion.page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/apprenant" element={<ApprenantPage />} />
        <Route path="/formation" element={<FormationPage />} />
        <Route path="/addFormation" element={<AddFormation />} />
        <Route path="/addGroupes" element={<AddGroupe />} />
        <Route path="/addApprenant" element={<AddApprenant />} />
        <Route path="/detailsFormation/:id" element={<DetailsFormation />} />
        <Route
          path="/addApprenantInFormation"
          element={<AddApprenantInFormation />}
        />
        <Route path="/modifApprenant/:id" element={<ModifApprenant />} />
        <Route path="/modifFormation/:id" element={<ModifFormation />} />
        <Route path="/formateur" element={<FormateurPage />} />
        <Route path="/addFormateur" element={<AddFormateur />} />
        <Route path="/modifFormateur/:id" element={<ModifFormateur />} />
        <Route path="/promotion" element={<PromotionPage />} />
        <Route path="/addPromotion" element={<AddPromotion />} />
        <Route path="/modifPromotion/:id" element={<ModifPromotion />} />

        <Route path="/groupes" element={<GroupePage />} />
      </Route>
    </Routes>
  );
}

export default App;
