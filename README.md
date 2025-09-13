/*
//1.session token==nextAuth creates it using nextAuth_secret
//2.customToken=== we create it manually using jose with jwt_scerte 
then we put customtoken in session token of nextAuth and that 
customToken in /inspect/application/cookies/
{...custom-token:customToken} in cookies manuallly in page.tsx 

  // ✅ Set custom token as cookie when session exists
  useEffect(() => {
    if (session?.user?.customToken) {
      console.log('🍪 Setting custom token cookie');
      document.cookie = `custom-token=${session.user.customToken}; path=/; max-age=3600; samesite=lax`;
    }
  }, [session])

then in middleware we take custom-token from /inspect/application/
cookies db of browser and verify with our jwt_secert 

jwt .verify(req.cookies('custom-token),jwt_secret)


optional:- we can also verify nextauth sessiontoken using 
nextAuth_secert 

*/













2.why its usefull in subscritpion model ???

FLOW==> when genrating token in authoption.ts we can set the expiry token for certain time period like this  ...setExpirationTime("365d")//yearly plan or we can just cahneg the JWT_SECRET==> it will all who have that token now plan is over so is token validation 
