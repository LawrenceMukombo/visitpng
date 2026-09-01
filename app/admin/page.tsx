import {requireVisitPngUser,signOutPath} from "../auth";
import {getAdminCatalogue} from "../../db/admin";
import {getAdminProviderApplications, type ProviderApplicationRecord} from "../../db/providers";
import {getAdminMembershipOverview} from "../../db/membershipEcosystem";
import AdminDashboard, {type AdminDashboardData} from "./AdminDashboard";

export const dynamic="force-dynamic";

export default async function AdminPage(){
  const user=await requireVisitPngUser("/admin");
  
  let initialData: AdminDashboardData | null = null;
  let initialProviderApps: ProviderApplicationRecord[] = [];
  let initialMembership = null;

  try {
    const [catalogue, apps, membership] = await Promise.all([
      getAdminCatalogue(user, "PNG").catch(err => {
        console.error("Admin catalogue server prefetch error:", err);
        return null;
      }),
      getAdminProviderApplications(user).catch(err => {
        console.error("Admin provider apps server prefetch error:", err);
        return { applications: [] };
      }),
      getAdminMembershipOverview().catch(err => {
        console.error("Admin membership server prefetch error:", err);
        return null;
      })
    ]);
    initialData = (catalogue as unknown as AdminDashboardData) || null;
    initialProviderApps = apps?.applications || [];
    initialMembership = membership;
  } catch (err) {
    console.error("AdminPage prefetch error:", err);
  }

  return (
    <AdminDashboard
      viewer={{name:user.displayName,email:user.email,signOut:signOutPath("/admin")}}
      initialData={initialData}
      initialProviderApps={initialProviderApps}
      initialMembershipData={initialMembership}
    />
  );
}
