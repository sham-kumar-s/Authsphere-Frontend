import { useProfile } from "../hooks/useProfile.js"

export default function Dashboard () {
const { data,isLoading,err } = useProfile();

if(isLoading) return <p>Loading...</p>
if(err) return <p>Error Loading Profile...</p>

return(
    <>
    <div>
        <h2>DashBoard</h2>
        <p>User ID : {data.id}</p>
        <p>role : {data.role}</p>
    </div>
    </>
)
}