export const load = async ({ url }) => {
    const accountCreated = url.searchParams.get('accountCreated');
    return {
        accountCreated: accountCreated === 'true'
    };
}