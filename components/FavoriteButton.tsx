import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    movieId
}) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response;

        if (isFavorite) {
            response = await axios.put('/api/favorite', {
                movieId
            })
        } else {
            response = await axios.post('/api/favorite', {
                movieId
            })
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        });

        // keu thay doi lai favorites bang cach fetch lai favorites
        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    return (
        <div 
        onClick={toggleFavorites}
        className="
            cursor-pointer
            group/item
            w-6
            h-6
            lg:w-10
            lg:h-10
            border-white
            border-2
            rounded-full
            flex
            justify-center
            items-center
            transition
            hover:border-netural-300
        ">
            { isFavorite ? 
                <AiOutlineCheck className="text-white" size={20} />
            :
                <AiOutlinePlus className="text-white" size={20}/>
            }
        </div>
    )
}

export default FavoriteButton;