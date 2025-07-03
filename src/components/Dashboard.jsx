import UserSec from "./UserSec";
import Barrating from "./Barrating";
import Piechart from "./Piechart";
import LoadingSpinner from "./LoadingSpinner";
import ErrorDisplay from "./ErrorDisplay";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        if (location.state && location.state.profileData) {
            setProfileData(location.state.profileData);
            setLoading(false);
        } else {

            const fetchProfileData = async () => {
                try {
                    const url = "http://localhost:3000/profile/LokitheHuman"; // fallback username
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error("Failed to fetch profile data");
                    }
                    const data = await response.json();
                    setProfileData(data);
                } catch (err) {
                    console.error("Error fetching profile data:", err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchProfileData();
        }
    }, [location.state]);

    if (loading) {
        return (
            <LoadingSpinner 
                title="Loading Your Profile" 
                subtitle="Fetching your contest data and statistics..." 
            />
        );
    }

    if (error) {
        return (
            <ErrorDisplay
                title="Oops! Something went wrong"
                error={error}
                onRetry={() => navigate("/reg-form")}
                retryText="Enter Handle Again"
            />
        );
    }

    if (!profileData) return null;


    const Profile = profileData;

    return (
        <main className="flex-1 px-4">
            <div className="max-w-6xl bg-stone-900 rounded-lg shadow-md mt-6 mb-6 mx-auto p-6">
                <UserSec
                    handle={Profile.profile.handle}
                    rating={Profile.profile.rating}
                    max_rating={Profile.profile.max_rating}
                    avatar={Profile.profile.avatar}
                    rank={Profile.profile.rank}
                    problemsolved={Profile.problemsolved}
                    last_online={Profile.profile.last_online}
                />
                <Barrating
                    data={Profile.rating}
                />
                <Piechart
                    data={Profile.topics}
                />

            </div>
        </main>
    )
}