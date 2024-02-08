import { NextResponse } from "next/server"; 

export async function GET() {
    return NextResponse.json([
        {
          id: 1,
          name: "МТС",
          logo: "https://uslugi-alt.speczakaz.info/uploads/ob/365640/imag1.jpg",
        },
        {
          id: 2,
          name: "Билайн",
          logo: "https://u.9111s.ru/uploads/202112/09/c1e7351e4c187976bf8676a9d844a259.jpg",
        },
        {
          id: 3,
          name: "Мегафон",
          logo: "https://catherineasquithgallery.com/uploads/posts/2023-02/1676710860_catherineasquithgallery-com-p-zelenii-fon-megafon-140.jpg",
        },
      ])
}