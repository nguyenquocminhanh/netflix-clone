import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

// get 1 random movies from DB
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session?.user?.email) {
            return res.status(401).end()
        }

        return res.status(200).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}