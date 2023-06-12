import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        await serverAuth(req, res);

        const categoryId = req.query.categoryId as string;

        const categoryMovies = await prismadb.categoryMovie.findMany({
            where: {
                categoryId: categoryId
            },
            include: { movie: true },
        });

        const movies = categoryMovies.map(categoryMovie => {
            return categoryMovie.movie;
        })

        return res.status(200).json(movies);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}