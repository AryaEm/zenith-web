export default function GameCategory() {
    return (
        <main className="h-dvh w-full primary flex items-end justify-center pb-14">
            <div className="w-[70%] h-4/5 relative">
                {/* <div className="absolute bottom-6 right-0 text-[#007AFF] font-medium text-lg border-b border-[#007AFF] cursor-pointer"><Link href={''}>Show More</Link></div> */}
                <div className="w-full h-[15%] flex flex-col items-center sfprodisplay">
                    <p className="text-white opacity-60 mb-2">Catalog</p>
                    <p className="font-medium text-white text-2xl">Game Category</p>
                </div>

                <div className="h-3/4 w-full grid grid-cols-3 gap-4 py-4">
                    <div className="border cursor-pointer text-xl bg-white bg-opacity-10 backdrop:blur-md rounded game-category-shadow flex items-center justify-center text-[#007AFF] font-medium">Action</div>
                    <div className="border cursor-pointer text-xl bg-white bg-opacity-10 backdrop:blur-md rounded game-category-shadow flex items-center justify-center text-[#007AFF] font-medium">Survival</div>
                    <div className="border cursor-pointer text-xl bg-white bg-opacity-10 backdrop:blur-md rounded game-category-shadow flex items-center justify-center text-[#007AFF] font-medium">Horror</div>
                    <div className="border cursor-pointer text-xl bg-white bg-opacity-10 backdrop:blur-md rounded game-category-shadow flex items-center justify-center text-[#007AFF] font-medium">Anime</div>
                    <div className="border cursor-pointer text-xl bg-white bg-opacity-10 backdrop:blur-md rounded game-category-shadow flex items-center justify-center text-[#007AFF] font-medium">Adventure</div>
                    <div className="border cursor-pointer text-xl bg-white bg-opacity-10 backdrop:blur-md rounded game-category-shadow flex items-center justify-center text-[#007AFF] font-medium">Sport</div>
                </div>

            </div>
        </main>
    )
}