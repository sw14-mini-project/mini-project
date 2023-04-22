export const emailRegexCheck = (context, email) => {
    // eslint-disable-next-line
    const titleRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (titleRegEx.test(email)) {
        return true
    } else {
        context.snackbarShow = false
        context.snackbarMsg = "이메일 형식이 틀립니다."
        context.snackbarShow = true
        return false
    }
}