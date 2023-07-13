import QuickSearch from "@/app/components/QuickSearch";//"./components/QuickSearch";
import RecommendedTrips from "@/app/components/RecommendedTrips";//"./components/RecommendedTrips";
import TripSearch from "@/app/components/TripSearch";//"./components/TripSearch";

export default function Home() {
    return (
        <div>
            <TripSearch />
            <QuickSearch />
            <RecommendedTrips />
        </div>
    );
}