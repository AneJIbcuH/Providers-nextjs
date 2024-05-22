import { NextResponse } from "next/server"; 

export async function GET() {
    return NextResponse.json([
        {
          id: 1,
          name: "МТС",
          logo: "https://sun6-20.userapi.com/s/v1/ig2/VVheC3A_aKFS50H44KztVQRh0BFHvVX97mJpayPEi4rukxTQHjF156yEwCeQJXYZTS3FDF1C7KZYpmraAm59mtEn.jpg?size=1440x1440&quality=96&crop=79,2,1440,1440&ava=1",
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
