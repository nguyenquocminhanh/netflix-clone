import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useBillboard from "@/hooks/useBillboard";
import useFavorite from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import prismadb from '@/libs/prismadb';
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface CategoryProps {
  category: {
    id: string,
    name: string
  }
}

const Category: React.FC<CategoryProps> = ({
  category
}) => {
  const { data: movies = [] } = useMovieList(category.id);
  const { data: favorites = [] } = useFavorite();
  const { isOpen, closeModal } = useInfoModal();

  const { data } = useBillboard(category.id.toString());
  const router = useRouter();

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
          <title>{capitalizeFirstLetter(category.name) + ' - Netflix Clone'}</title>
          <meta
              name="description"
              content={capitalizeFirstLetter(category.name) + ' - Netflix Clone'}
          />
     </Head>
     <InfoModal visible={isOpen} onClose={closeModal}/>
     <Navbar />

     <Billboard data={data}/>

      <div className="pb-40">
        <MovieList
          title={category.name === 'new' ? 'New & Popular' : capitalizeFirstLetter(category.name)}
          id="trending"
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

export default Category;

// dynamic paths
export async function getStaticPaths() {
    // fetch data ONLY contain _id NOTHING ELSE
    const categories = await prismadb.category.findMany();

    return {
        // chi pre-render nhung page truoc khi build app
        // ko can co gang pre-render nhung page khac, nhung page khac duoc them vao sau khi build se dc generate at incoming request
        fallback: 'blocking',  

        paths: categories.map(category => ({
            params: {categoryName: category.name}
        }))
    }
}

export async function getStaticProps( context: any ) {
    // get category
    const categoryName = context.params.categoryName;
 
    const category = await prismadb.category.findFirst({
        where: {
            name: categoryName
        }
    });
  
    if (!category) {
      // If movieData doesn't exist, return not found page
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        category,
      },
      revalidate: 3600
    };
}