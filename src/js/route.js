import router from "@/plugins/router";

const gotoPage = (targetUrl, query) => {
    let pushParam = {name: targetUrl};
    if (typeof query != 'undefined') {
        pushParam['query'] = query;
    }
    console.log(pushParam)
    router.push(pushParam);
}

const gotoPageParam = (targetUrl, query) => {
    let pushParam = {name: targetUrl};
    if (typeof query != 'undefined') {
        pushParam['params'] = query;
    }
    console.log(pushParam)
    router.push(pushParam);
}

export {gotoPage, gotoPageParam}