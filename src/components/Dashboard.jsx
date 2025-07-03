import UserSec from "./UserSec";
import Barrating from "./Barrating";
import Piechart from "./Piechart";


export default function Dashboard() {
    const Profile = {
        profile: {
            id: 2,
            user_id: 38,
            handle: "LokitheHuman",
            rating: 1070,
            max_rating: 1073,
            avatar: "https://userpic.codeforces.org/no-title.jpg",
            rank: "newbie",
            last_online: "2025-06-25T10:52:12.000Z"
        },
        problemsolved: 43,
        topics: {
            greedy: 26,
            math: 15,
            implementation: 13,
            "constructive algorithms": 13,
            "brute force": 11,
            sortings: 6,
            "binary search": 4,
            "two pointers": 4,
            strings: 4,
            "data structures": 3,
            dp: 3,
            "number theory": 3,
            bitmasks: 2,
            interactive: 1,
            probabilities: 1,
            graphs: 1
        },
        rating: {
            "800": 15,
            "900": 3,
            "1000": 2,
            "1100": 4,
            "1200": 7,
            "1300": 2,
            "1400": 1,
            "1500": 2,
            "1600": 4,
            "1700": 1
        }
    };
    // const Profiledata = Profile.

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