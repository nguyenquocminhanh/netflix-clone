import { useRouter } from "next/router"
import { AiOutlineArrowLeft } from 'react-icons/ai';
import prismadb from '@/libs/prismadb';
import Head from "next/head";
import useCurrentUser from "@/hooks/useCurrentUser";

interface MovieIdProps {
    movie: Record<string, any>
}

const Watch: React.FC<MovieIdProps> = ({
    movie
}) => {
    const router = useRouter();

    // protect route
    const { data: user, error } = useCurrentUser();

    if (error) {
      router.push('/auth');
    }

    return (
        <>
            <Head>
                <title>{movie.title}</title>
                <meta
                    name="description"
                    content={movie.title}
                />
            </Head>
            <div className="
                h-screen
                w-screen
                bg-black
            ">
                <nav className="
                    fixed
                    w-full
                    p-4
                    z-10
                    flex
                    flex-row
                    items-center
                    gap-4
                    bg-black
                    bg-opacity-70
                ">
                    <AiOutlineArrowLeft className="text-white cursor-pointer" size={30} onClick={() => router.back()}/>
                    <p className="text-white text-1xl md:text-3xl font-bold">
                        <span className="font-light">
                            Watching: 
                        </span>
                        &nbsp;{movie?.title}
                    </p>
                </nav>

                <video poster={movie?.thumbnailUrl} src={movie?.videoUrl} autoPlay controls className="h-full w-full"></video>
            </div>
        </>
    )
}

// dynamic paths
export async function getStaticPaths() {
    // fetch data ONLY contain _id NOTHING ELSE
    const movies = await prismadb.movie.findMany();

    return {
        // chi pre-render nhung page truoc khi build app
        // ko can co gang pre-render nhung page khac, nhung page khac duoc them vao sau khi build se dc generate at incoming request
        fallback: false,  

        paths: movies.map(movie => ({
            params: {movieId: movie.id.toString()}
        }))
    }
}

export async function getStaticProps( context: any ) {
    const movieId = context.params.movieId;
 
    const movie = await prismadb.movie.findUnique({
        where: {
            id: movieId
        }
    });
  
    if (!movie) {
      // If movieData doesn't exist, return not found page
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        movie,
      }
    };
}

export default Watch;