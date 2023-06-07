import { NextApiRequest, NextApiResponse } from "next";
import { update, without } from "lodash";

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // add new movie to favorite
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
            const { movieId } = req.body;
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            });

            if(!existingMovie) {
                throw new Error('Invalid movie ID');
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || ''
                },
                data: {
                    favoriteIds: {
                        push: movieId
                    }
                }
            })

            return res.status(200).json(user);
        }

        // remove movie from favorite
        if (req.method === 'PUT') {
            const { currentUser } = await serverAuth(req, res);
            const { movieId } = req.body;
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            });

            if(!existingMovie) {
                throw new Error('Invalid movie ID');
            }
            
            // remove movieId from favoriteIds
            const updatedFavoriteMovieIds = without(currentUser.favoriteIds, movieId);

            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                }, 
                data: {
                    favoriteIds: updatedFavoriteMovieIds
                }
            })

            return res.status(200).json(updatedUser);
        }

        // wrong method
        return res.status(405).end();
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
}