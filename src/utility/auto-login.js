export const autoLogin = (refreshTokenAndSignIn, signInByLocalData, finishLoading) => {
    if (localStorage.getItem('token')) {
        const expiresIn = localStorage.getItem('expirationTime') - 30;

        if (+Math.floor((new Date().getTime() / 1000)) >= expiresIn) {
            const token = {
                token: localStorage.getItem('token')
            }

            refreshTokenAndSignIn(token);
        } else {
            signInByLocalData();
        }
    } else finishLoading();
}
