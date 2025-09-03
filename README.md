1.how nextAuth middleware works ?? 

FLOW ---->user go to page.tsx(signIn('google'),signOut,useSession)==>google Oauth popup then user sign==>google send TAC to nextauth==>next auth sedn TAC to google google then send userId,name,img,==> next auth encryot theses into {userId,name ,img } thats we aclled sesssion token===>but in auth option we created our own  token using jose and .env JWT_SECRET ===>then  we put that token into session token along with id,anme ,img now session tokena has {userId,name,img,cutomtoken: jose token}==> then nextauth automatically put that session token into browser/appplication/cookies---> a kind of db but in broweswer like localstorage ===>after thhat userLogin===>save toekn in broswer ==> if broswer make any req ==> along with api payload, browser auotmatically sedn the session token ===>but that token not hit direct api rather hit middleware.ts  file where from website=> req.cookies.get("custom-token")?. 

for mobile       req.headers.get("Authorization")?.replace("Bearer ", ""); 
we bring the token from==>website/inspect/application/cookies/sessionObjcet. and verify  with   jose 




2.why its usefull in subscritpion model ???

FLOW==> when genrating token in authoption.ts we can set the expiry token for certain time period like this  ...setExpirationTime("365d")//yearly plan or we can just cahneg the JWT_SECRET==> it will all who have that token now plan is over so is token validation 
