import { Auth, Typography, Button } from "@supabase/ui";
const { Text } = Typography
import { supabase } from '../../api'
import { useState, useEffect } from 'react'

function Profile(props) {
    const { user } = Auth.useUser();
    const [name, setName] = useState(null)

    if (user)
      return (
        <div className='p-[15vmin]'>
          <Text>Signed in: {user.email}</Text><br/>
          
          <Button block onClick={() => props.supabaseClient.auth.signOut()}>
            Sign out
          </Button>
        </div>
      );
    return props.children 
}

export default function AuthProfile() {
    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Profile supabaseClient={supabase}>
            <Auth supabaseClient={supabase} />
          </Profile>
        </Auth.UserContextProvider>
    )
}