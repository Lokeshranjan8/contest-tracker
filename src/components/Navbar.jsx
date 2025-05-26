import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className=" w-full  bg-neutral-950  sticky z-10 top-0 h-20  p-5  ">
            <div className="flex justify-between bg-  " >
                <div>
                    <h1 className="text-3xl font-semibold px-20  text-green-600">Contest Tracker</h1>
                </div>

                <ul className="flex  space-x-7 px-20 py-2">
                    <li>
                        <a href="/" className="hover:underline text-green-600">Home</a>
                    </li>
                    <li>
                        <Link to="/contest-ai-help" className="hover:underline text-green-600">Contest AI HELP</Link>
                    </li>
                    <li>
                        <a href="/github" className="hover:underline text-green-600">Github</a>
                    </li>
                </ul>
            </div>
        </div>
    )

}