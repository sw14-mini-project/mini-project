import { createRouter, createWebHashHistory } from 'vue-router';

import ChatComponent from "@/components/Chat";
import SettingComponent from "@/components/Setting";
import SearchComponent from "@/components/Search";

// Vue 라우터 인스턴스 생성
const router = new createRouter({
    history: createWebHashHistory(),
    routes: [
        // TODO: 추가한 페이지 여기에 추가
        {path: '/', redirect: '/chat'},
        {path: '/chat', component: ChatComponent, name: 'chat'},
        {path: '/set', component: SettingComponent, name: 'setting'},
        {path: '/search', component: SearchComponent, name: 'search'},
    ]
});

export default router;