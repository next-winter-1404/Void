import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import DashFav from './DashFav';

export default async function DashFavPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const user_id = token ? jwtDecode<{ id: string }>(token).id : '';

  return <DashFav user_id={user_id} />;
}
