import { useProfile } from "../hooks/useProfile.js";
import { useLogout } from "../hooks/useLogout.js";

export default function Dashboard () {

const { data,isLoading,err } = useProfile();
const logout = useLogout();

if(isLoading) return <p>Loading...</p>
if(err) return <p>Error Loading Profile...</p>
if(!data) return null;

return(
    <>
    <div>
        <h2>DashBoard</h2>
        <p>User ID : {data.id}</p>
        <p>role : {data.role}</p>

      <button onClick={logout}>
        Logout
      </button>

    </div>
    </>
)
}