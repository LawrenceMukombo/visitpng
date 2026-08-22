import {requireVisitPngUser,signOutPath} from "../auth";
import AdminDashboard from "./AdminDashboard";
export const dynamic="force-dynamic";
export default async function AdminPage(){const user=await requireVisitPngUser("/admin");return <AdminDashboard viewer={{name:user.displayName,email:user.email,signOut:signOutPath("/admin")}}/>}
