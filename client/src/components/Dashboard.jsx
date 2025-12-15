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
        //const BaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const BaseUrl = "http://localhost:5000";
        if (location.state?.profileData) {
            setProfileData(location.state.profileData);
            setLoading(false);
        } else {
            const storedHandle = localStorage.getItem("userHandle");

            if (!storedHandle) {
                navigate("/reg-form");
                return;
            }

            const fetchProfileData = async () => {
                try {
                    const response = await fetch(`${BaseUrl}/profile/${storedHandle}`);
                    if (!response.ok) throw new Error("Failed to fetch profile data");
                    const data = await response.json();
                    setProfileData(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfileData();
        }
    }, [location.state, navigate]);


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

    if (!profileData) {
        return <p className="text-center text-gray-400">No profile data available.</p>;
    }


    const FullProfile = profileData;
    console.log(FullProfile.profile);
    //data type
    console.log(typeof FullProfile.profile);

    return (
        <main className="flex-1 px-2 sm:px-4 lg:px-6">
            <div className="max-w-7xl bg-stone-900 rounded-lg shadow-md mt-6 mb-6 mx-auto p-3 sm:p-4 lg:p-6">
                <UserSec
                    handle={FullProfile.profile.handle}
                    rating={FullProfile.profile.rating}
                    max_rating={FullProfile.profile.max_rating}
                    avatar={FullProfile.profile.avatar}
                    rank={FullProfile.profile.rank}
                    problemsolved={FullProfile.problemsolved}
                    last_online={FullProfile.profile.last_online}
                />
                <Barrating
                    data={FullProfile.rating}
                />
                <Piechart
                    data={FullProfile.topics}
                />

            </div>
        </main>
    )
}