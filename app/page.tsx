import {chatGPTSignInPath,chatGPTSignOutPath,getChatGPTUser} from "./chatgpt-auth";
import VisitPngApp from "./VisitPngApp";
export const dynamic="force-dynamic";
export default async function Home(){const user=await getChatGPTUser();const viewer=user?{signedIn:true as const,displayName:user.displayName,email:user.email,signOutPath:chatGPTSignOutPath("/")}:{signedIn:false as const,signInPath:chatGPTSignInPath("/")};return <VisitPngApp viewer={viewer}/>}
