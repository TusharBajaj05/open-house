
import { NextResponse } from "next/server";

interface Home{
    id: string,
    communityId: string,
    price: number,
    area: number,
    type: string
}

export async function GET(req: Request) {
    try {
        const response = await fetch('https://storage.googleapis.com/openhouse-ai-fe-coding-test/homes.json')
        const data: Home[] = await response.json()
        return NextResponse.json({success: true, data: data}, {status: 200})
    }
    catch(err:any){
        console.error(err)
        return NextResponse.json({success: false}, {status: 500})
    }
}