import DashboardTemplate from "@/components/dashboard-template";
import MenuList from "./menu-list";
import HeroSect from "@/components/dashboard-template/hero-section";
import RecommendedGames from "@/components/dashboard-template/recommended-games";
import SpecialOffers from "@/components/dashboard-template/special-offers";
import GameCategory from "@/components/dashboard-template/game-category";
import GameList from "@/app/cart/game-list";
import Sponsor from "@/components/dashboard-template/sponsor";
import FAQ from "@/components/dashboard-template/faq";
import Footer from "@/components/dashboard-template/footer-component/footer";

export default function DashboardPage() {
  return (
    <>
      <DashboardTemplate title="Dashboard" id="dashboard" menuList={MenuList}>
        <HeroSect />
        <RecommendedGames />
        <SpecialOffers />
        <GameCategory />
        <GameList />
        <Sponsor />
        <FAQ />
        <Footer />
      </DashboardTemplate>
    </>
  );
}