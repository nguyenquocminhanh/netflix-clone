import useSwr from 'swr';
import fetcher from '@/libs/fetcher';

const useMovieList = (categoryId?: string) => {
    let apiUrl = '/api/movies';

    if (categoryId) {
        apiUrl = `/api/movies/category/${categoryId}`
    }
    const { data, error, isLoading } = useSwr(apiUrl, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return {
        data, error, isLoading
    }
};

export default useMovieList;
