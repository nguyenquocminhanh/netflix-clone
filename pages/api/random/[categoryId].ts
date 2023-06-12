import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

// get 1 random movies from DB
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        await serverAuth(req, res);

        const categoryId = req.query.categoryId as string;

        const movieCount = await prismadb.categoryMovie.count({
            where: {
                categoryId: categoryId
            }
        });
        const randomIndex = Math.floor(Math.random() * movieCount);

        const randomMovies = await prismadb.categoryMovie.findMany({
            where: {
                categoryId: categoryId
            },
            include: { movie: true },
            take: 1,
            skip: randomIndex
        })

        if (randomMovies.length > 0) {
            return res.status(200).json(randomMovies[0].movie);
        } else {
            return res.status(404).json({ error: 'No movies found in the specified category.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}