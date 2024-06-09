
import { NextResponse,NextRequest } from 'next/server';

import {database } from '../../database/firebase'
import { getDoc, doc } from 'firebase/firestore'



 async function GET(req: NextRequest, res: NextResponse) {
  const method = req.method;

  if (method === "GET") {
    try {
      const docRef = doc(database, 'salaries','4OkZHjF5WAUsXy3tsJ35')
    
       const docData:any = await getDoc(docRef);
       let userSalary= docData.data()
       
       
          return NextResponse.json(userSalary, {
          status: 200,
        });

    } catch (error) {
          console.error(error);
          return NextResponse.json({ error: 'An error occurred while fetching the salary stats' ,  status: 500 });
        } 
  } 
}

export {GET}