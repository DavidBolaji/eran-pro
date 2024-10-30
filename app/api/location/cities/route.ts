
import { cities } from "@/utils/data"
import { NextResponse } from "next/server"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(
    req: Request,
  ) {
    try {
        const { state } = await req.json()
    
      return NextResponse.json({ message: `${state} retrieved`, data: [...cities[state]] })
    } catch (error) {
      console.log('[PRODUCT_GET_SINGLE]', error)
      return new NextResponse('Internal error', { status: 500 })
    }
  }