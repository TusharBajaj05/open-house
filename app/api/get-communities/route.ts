import { NextResponse } from "next/server";

interface Community{
    id: string,
    name: string, 
    imgUrl: string,
    group: string
}

export async function GET(req: Request) {
    try {
        const response = await fetch('https://storage.googleapis.com/openhouse-ai-fe-coding-test/communities.json')
        const data: Community[] = await response.json()
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        return NextResponse.json({success: true, data: sortedData}, {status: 200})
    }
    catch(err:any){
        console.error(err)
        return NextResponse.json({success: false}, {status: 500})
    }
}
