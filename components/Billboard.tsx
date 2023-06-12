import useBillboard from "@/hooks/useBillboard";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import { useCallback } from "react";
import useInfoModal from "@/hooks/useInfoModal";

interface BillboardProps {
    data: Record<string, any>
}

const Billboard: React.FC<BillboardProps> = ({
    data
}) => {
    const { openModal } = useInfoModal();

    const handleOpenModal = useCallback(() => {
        openModal(data?.id);
    }, [openModal, data?.id]);

    return (
        <div className="relative h-[80vw] md:h-[56.25vw]" id="billboard">
            <video 
                className="
                    w-full 
                    h-[80vw]
                    md:h-[56.25vw] 
                    object-cover 
                    brightness-[60%]"
                autoPlay
                muted
                loop
                playsInline
                poster={data?.thumbnailUrl} 
                src={data?.videoUrl}>
            </video>

            {/* absolute */}
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="
                    text-white 
                    text-1xl 
                    md:text-5xl 
                    h-full 
                    w-[50%] 
                    lg:text-6xl 
                    font-bold 
                    drop-shadow-xl">
                    {data?.title}
                </p>

                <p className="
                    text-white
                    text-[8px]
                    md:text-lg
                    mt-3
                    md:mt-8
                    w-[90%]
                    md:w-[80%]
                    lg:w-[50%]
                    drop-shadow-xl
                ">
                    {data?.description}
                </p>

                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    {/* Play button */}
                    <PlayButton movieId={data?.id}/>
                    {/* More Info Button */}
                    <button className="
                        bg-white
                        text-white
                        bg-opacity-30
                        rounded-md
                        py-1 md:py-2
                        px-2 md:px-4
                        w-auto
                        text-xs
                        lg:text-lg
                        font-semibold
                        flex
                        flex-row
                        items-center
                        hover:bg-opacity-20
                        transition
                    "
                        onClick={handleOpenModal}
                    >
                        <AiOutlineInfoCircle className="mr-1" size={20}/>
                        More Info
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Billboard;