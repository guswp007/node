const { alert } = require('../lib/common');

/**
* 회원 가입 유효성 검사 
*/
module.exports.joinValidator = (req, res, next) => {
	// 필수 입력항목 체크 
	if (!req.body.memId) {
		return alert("아이디를 입력하세요.", res);
	}
	
	if (!req.body.memPw) {
		return alert("비밀번호를 입력하세요.", res);
	}
	
	next(); // 유효성 검사 성공시 -> 다음 미들웨어로 이동
};