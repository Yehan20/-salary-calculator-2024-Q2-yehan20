import {NextApiResponse} from 'next';
import {NextResponse} from 'next/server';

import {database } from '../../database/firebase'
import { doc , updateDoc} from 'firebase/firestore'

// handling post request 
export async function POST(req : any, res : NextApiResponse) {

    const method = req.method;

    if (method === 'POST') {
        try {
            const body  =await req.json()
            console.log(body)


            const docRef = doc(database,'salaries', process.env.NEXT_PUBLIC_FIREBASE_COLLECTION as string);
    
          
              await updateDoc(docRef, {
                 ...body[0]
              })
          

            return NextResponse.json('Data received and processed successfully', {status: 200});

        } catch (error) {
            console.error(error);
            return NextResponse.json({
                error: 'Server Error',
                status: 500
            });
        }
    } else { 
        return NextResponse.json({error: 'Method not allowed', status: 405});
    }
}

export const revalidate = 0;
