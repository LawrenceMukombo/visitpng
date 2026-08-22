import {getVisitPngUser,signInPath,signOutPath} from "./auth";import VisitPngApp from "./VisitPngApp";
export const dynamic="force-dynamic";
export default async function Home(){const user=await getVisitPngUser();const viewer=user?{signedIn:true as const,displayName:user.displayName,email:user.email,signOutPath:signOutPath("/")}:{signedIn:false as const,signInPath:signInPath("/")};return <VisitPngApp viewer={viewer}/>}
