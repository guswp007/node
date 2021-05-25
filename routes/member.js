const express = require('express');

const router = express.Router();

router.route("/join")
		/** 회원 가입 양식 */
		.get((req, res, next) => {
			res.render("member/form")
		})
		/** 회원 가입 처리 */
		.post((req, res, next) => {
			
		});

module.exports = router;