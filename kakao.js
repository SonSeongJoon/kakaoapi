const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = 5000;

const USERNAME = process.env.DIRECTSEND_USERNAME;
const API_KEY = process.env.DIRECTSEND_API_KEY;
console.log(API_KEY)
const KAKAO_PLUS_ID = "@seoulir07";
const USER_TEMPLATE_NO = "20";

app.use(bodyParser.json());

app.get("/send_kakao", async (req, res) => {
	try {
		const apiUrl = "https://directsend.co.kr/index.php/api_v2/kakao_notice";

		const response = await axios.post(apiUrl, {
			username        : USERNAME,
			key             : API_KEY,
			type            : "node",
			kakao_plus_id   : KAKAO_PLUS_ID,
			user_template_no: USER_TEMPLATE_NO,
			receiver        : [
				{"name"    : "손성준",
					"mobile": "01028184783",
					"note1" : "다이렉트센드 1",
					"note2" : "다이렉트센드 2",
					"note3" : "다이렉트센드 3",
					"note4" : "다이렉트센드 4"
				},
			]
		}, {
			headers: {
				"Content-Type" : "application/json;charset=utf-8",
				"Accept"       : "application/json",
				"Cache-Control": "no-cache"
			}
		});

		// 성공/실패 여부를 클라이언트에 전달합니다.
		res.json(response.data);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
});


app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
