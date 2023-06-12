import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieListSearch from "@/hooks/useMovieListSearch";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";


const SearchResult = () => {
  const { isOpen, closeModal } = useInfoModal();

  const router = useRouter();
  const searchKeyword = Array.isArray(router.query.keyword)
  ? decodeURIComponent(router.query.keyword.join(' '))
  : decodeURIComponent(router.query.keyword!) || '';

  const { data: movies = [] } = useMovieListSearch(searchKeyword);

    // protect route
    useEffect(() => {
        axios.get('/api/check-authorization')
        .then(response => {
        
        })
        .catch(error => {
          router.push('/auth');
        })
    }, [router])

  return (
    <>
    <Head>
        <title>Search Result</title>
        <meta
            name="description"
            content='Search Result'
        />
    </Head>
     <InfoModal visible={isOpen} onClose={closeModal}/>

     <Navbar />

      
      <div className="pb-40 pt-12 md:pd-20">
        {movies.length > 0  ?
            <MovieList
                title={`Search result for ${searchKeyword}`}
                id="search"
                data={movies}
            />
        : <p className='ml-4 md:ml-16 mt-12 md:mt-20 text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>
            Sorry! There are no matching result...
        </p>}
      
      </div>
    </>
  )
}

export default SearchResult;