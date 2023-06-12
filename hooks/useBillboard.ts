import useSwr from 'swr';
import fetcher from '@/libs/fetcher';

const useBillboard = (categoryId?: string) => {
    let apiUrl = '/api/random';
    if (categoryId) {
        apiUrl = `/api/random/${categoryId}`
    }

    const { data, error, isLoading } = useSwr(apiUrl, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return {
        data,
        error,
        isLoading
    }
}

export default useBillboard;