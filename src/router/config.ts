import { RouteRecordRaw } from "vue-router";
import { mapMenusToRoutes } from "../utils/MapRoutes";

/* 常驻路由 */
export const routes = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/home",
		component: () => import("views/home.vue"),
	},
	{
		path: "/about",
		component: () => import("views/about.vue"),
	},
];

// userMenus的数据向后端请求
// 逻辑是：用户发起登录请求 -> 携带账号密码发起网络请求 -> 根据用户的某些关键字段(role.id)请求用户的权限(动态路由)等
// -> 拿到结果后将信息保存起来 -> 动态添加路由

// userMenus 应该是在login的时候处理 不应该在这个地方，数据不好传递
let userMenus: any[] = [];

/**
 * 动态路由
 * 用来放置有权限(Roles属性)的路由
 * 必须带有Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = mapMenusToRoutes(userMenus);
