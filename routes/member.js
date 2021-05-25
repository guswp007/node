const express = require('express');
const router = express.Router();
const member = require("../models/member"); // member Model 
const { joinValidator } = require('../middlewares/join_validator'); // 회원 가입 유효성 검사
const { alert, go } = require("../lib/common"); // 공통 함수 

/** 회원 가입 S */
router.route("/join")
		/** 회원 가입 양식 */
		.get((req, res, next) => {
			res.render("member/form");
		})
		/** 회원 가입 처리 */
		.post(joinValidator, async (req, res, next) => {
			try {
				const result = await member.join(req.body.memId, req.body.memPw);
				if (result) { // 성공 
					return go("/member/login", res, "parent");
				} 
			} catch (err) {
				console.error(err);
				next(err);
			}
			
			// 실패한 경우 
			return alert("관리자 등록요청 실패!", res);
		});
/** 회원 가입 E */

/** 로그인 S */
router.route("/login")
			// 로그인 양식 
			.get((req, res, next) => {
				return res.render("member/login");
			})
			// 로그인 처리 
			.post(joinValidator, async (req, res, next) => {
				try {
					const result = await member.login(req.body.memId, req.body.memPw, req);
					if (result) { // 로그인 성공
						return go("/admin", res, "parent");
					}
				} catch (err) {
					console.error(err);
					next(err);
				}
				
				// 로그인 실패
				return alert("로그인 실패!", res);
			});

/** 로그인 E */

/** 로그아웃 S */
router.get("/logout", (req, res, next) => {
	req.session.destroy();
	res.redirect("/member/login");
});
/** 로그아웃 E */
module.exports = router;