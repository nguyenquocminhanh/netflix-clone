import useSwr from 'swr';
import fetcher from '@/libs/fetcher';

const useMovieListSearch = (keyword: string) => {
    const { data, error, isLoading } = useSwr(`/api/movies/search?keyword=${keyword}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return {
        data, error, isLoading
    }
};

export default useMovieListSearch;
