export default function Card({title,platform,starttime,Link}){
    return (
        <div className="bg-blue-500 rounded-lg shadow-md p-4 w-[400px] ">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-gray-700">{platform}</p>
            <p className="text-gray-700">{starttime}</p>
            <a 
              href={Link}
              target=""
              className="hover:underline text-black-500 bg-zinc-400 rounded-lg shadow-md inline-block mt-2"
            >
                GO TO THE CONTEST
            </a>
        </div>
    )

}