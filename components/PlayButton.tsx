import { useRouter } from 'next/router';
import { BsPlayFill } from 'react-icons/bs';

interface PlayButtonProps {
    movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({
    movieId
}) => {
    const router = useRouter();

    return (
        <button className='
            bg-white
            rounded-md
            py-1
            md:py-2
            px-2 md:px-4
            w-auto
            text-xs
            lg:text-lg
            font-semibold
            flex
            flex-row
            items-center
            justify-center
            hover:bg-neutral-300
            transition
            cursor-pointer
        '
            onClick={() => router.push(`/watch/${movieId}`)}
        >
            <BsPlayFill size={20} className='mr-1'/>
            Play
        </button>
    )
}

export default PlayButton;