import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals, cookies }) => {

  const provider = JSON.parse(cookies.get('provider') || '{}');

  const code = url.searchParams.get('code');
  const redirectUrl = `${url.origin}/api/oauth/google/callback`;

  try {
    const authData = await locals.pb.collection('users').authWithOAuth2Code('google', code, provider.codeVerifier, redirectUrl);
    locals.user = authData.record;
    // TO LEARN: learn why the below line is failing but when you set the redirect out side the try block it is working
    // return redirect(303, '/');
  } catch (error) {
    return redirect(303, '/auth/signUp/?oauthError=true');
  }

  throw redirect(303, '/');
};
