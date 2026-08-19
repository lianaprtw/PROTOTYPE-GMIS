import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Explore from "../pages/Explore";
import CulinaryDetail from "../pages/CulinaryDetail";
import CulturalDetail from "../pages/CulturalDetail";
import IngredientDetail from "../pages/IngredientDetail";
import AgendaDetail from "../pages/AgendaDetail";
import MultimediaDetail from "../pages/MultimediaDetail";
import DestinationDetail from "../pages/DestinationDetail";
import MapPage from '../pages/MapPage';
import Profile from '../pages/Profile';
import SubmitAsset from '../pages/SubmitAsset';
import MySubmission from '../pages/MySubmission';
import SubmissionDetail from "../pages/SubmissionDetail";
import CuratorDashboard from "../pages/CuratorDashboard";
import ReviewSubmission from "../pages/ReviewSubmission";
import DetailReviewSubmission from "../pages/DetailReviewSubmission";
import PublishedAssets from "../pages/PublishedAssets";
import Contributors from "../pages/Contributors";
import Settings from "../pages/Settings";
import ContributorDetail from "../pages/ContributorDetail";
import GastronomyAI from "../pages/GastronomyAI";
import MolecularGastronomy from "../pages/MolecularGastronomy";
import DigitalCulinaryTechnology from "../pages/DigitalCulinaryTechnology";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/culinary/:id" element={<CulinaryDetail />} />
        <Route path="/culture/:id" element={<CulturalDetail />} />
        <Route path="/ingredient/:id" element={<IngredientDetail />} />
        <Route path="/agenda/:id" element={<AgendaDetail />} />
        <Route path="/multimedia/:id" element={<MultimediaDetail />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/submit-asset" element={<SubmitAsset />} />
        <Route path="/submit-asset/:id" element={<SubmitAsset />} />
        <Route path="/my-submission" element={<MySubmission />} />
        <Route path="/submission/:id" element={<SubmissionDetail />} />
        <Route path="/curator" element={<CuratorDashboard />} />
        <Route path="/curator/reviews" element={<ReviewSubmission />} />
        <Route path="/curator/review-submission/:id" element={<DetailReviewSubmission />} />
        <Route path="/curator/published-assets" element={<PublishedAssets />} />
        <Route path="/curator/contributors" element={<Contributors />} />
        <Route path="/curator/settings" element={<Settings />} />
        <Route path="/curator/contributors/:id" element={<ContributorDetail />} />
        <Route path="/ai" element={<GastronomyAI />} />
        <Route path="/molecular" element={<MolecularGastronomy />} />
        <Route path="/digital-culinary" element={<DigitalCulinaryTechnology />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;