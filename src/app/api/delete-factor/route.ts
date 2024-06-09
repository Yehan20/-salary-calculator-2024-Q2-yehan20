import { NextApiResponse} from 'next';
import {NextResponse} from 'next/server';

import {database } from '../../database/firebase'
import { doc , updateDoc} from 'firebase/firestore'

// deleting
async function POST(req : any, res : NextApiResponse) {

    const method = req.method;

    if (method === 'POST') {
        try {
            const body  =await req.json()
       
            const docRef = doc(database,'salaries', '4OkZHjF5WAUsXy3tsJ35');
    
             
              await updateDoc(docRef, {
                 ...body[0]
              })
          

            return NextResponse.json('Sucess Fully Updated the Value', {status: 200});

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

export {
    POST
}
