import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useBillboard from "@/hooks/useBillboard";
import useFavorite from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"
import Head from "next/head";

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorite();
  const { isOpen, closeModal } = useInfoModal();

  const { data } = useBillboard();

  return (
    <>
      <Head>
          <title>Netflix Clone - Minh Nguyen</title>
          <meta
              name="description"
              content='Netflix Clone - Minh Nguyen'
          />
     </Head>
     <InfoModal visible={isOpen} onClose={closeModal}/>
     <Navbar />

     <Billboard data={data}/>

      <div className="pb-40">
        <MovieList
          title="All Movies"
          id="all"
          data={movies}
        />

        <MovieList
          title="My List"
          id="my-list"
          data={favorites}
        />
      </div>
    </>
  )
}

// protect route
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}