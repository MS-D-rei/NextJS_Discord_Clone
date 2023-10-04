import { NextRequest, NextResponse } from 'next/server'

export { default } from 'next-auth/middleware'

// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/', '/users/:path*'],
}

// https://nextjs.org/docs/app/building-your-application/routing/middleware#using-cookies
// export const middleware = async (req: NextRequest) => {
//   const theme = req.cookies.get('theme')?.value ?? 'dark'
//   console.log('middleware theme', theme)
//
//   // Setting cookies on the response using the `ResponseCookies` API
//   const response = NextResponse.next()
//   response.cookies.set('theme', theme)
//
//   console.log('middleware response', response)
//   // middleware response {
//   //   cookies: ResponseCookies {"theme":{"name":"theme","value":"dark","path":"/"}},
//   //   url: '',
//   //   body: null,
//   //   bodyUsed: false,
//   //   headers: { set-cookie: 'theme=dark; Path=/', x-middleware-next: '1' },
//   //   ok: true,
//   //   redirected: false,
//   //   status: 200,
//   //   statusText: '',
//   //   type: 'default'
//   // }
//
//   return response
// }
