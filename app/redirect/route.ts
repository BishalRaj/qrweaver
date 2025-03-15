import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Get the URL from the query parameters
  const url = request.nextUrl.searchParams.get("url")

  // Validate the URL
  if (!url) {
    return new NextResponse("Missing URL parameter", { status: 400 })
  }

  try {
    // Validate that it's a proper URL
    new URL(url)

    // Here you could add analytics tracking, logging, etc.
    // For example, you could store the redirect in a database
    // await db.redirects.create({ url, timestamp: new Date() })

    // Redirect to the target URL
    return NextResponse.redirect(url)
  } catch (error) {
    // If the URL is invalid, return an error
    return new NextResponse("Invalid URL", { status: 400 })
  }
}

