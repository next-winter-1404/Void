import { Api } from "../../..";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.toString();

  const api = await Api();

  const houses = await api.houseListmortRent.getHouses(query);

  return NextResponse.json(houses);