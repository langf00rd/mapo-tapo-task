import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const query = new URL(request.url).searchParams.toString();
    const response = await fetch(`https://dummyjson.com/products?${query}`);
    const data = await response.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
