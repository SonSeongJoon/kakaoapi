const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = 5000;

const USERNAME = process.env.DIRECTSEND_USERNAME;
const API_KEY = process.env.DIRECTSEND_API_KEY;
const KAKAO_PLUS_ID = "@seoulir07";

app.use(bodyParser.json());

app.get("/send_kakao_create/name/:name/phoneNum/:phoneNum/file/:file/link/:link", async (req, res) => {
	const {name, phoneNum, file, title, link} = req.params;
	try {
		const apiUrl = "https://directsend.co.kr/index.php/api_v2/kakao_notice";

		const response = await axios.post(apiUrl, {
			username        : USERNAME,
			key             : API_KEY,
			type            : "node",
			kakao_plus_id   : KAKAO_PLUS_ID,
			user_template_no: 50,
			receiver        : [
				{"name"    : name,
					"mobile": phoneNum,
					"note1" : file,
					"note2" : link,
				},
			]
		}, {
			headers: {
				"Content-Type" : "application/json;charset=utf-8",
				"Accept"       : "application/json",
				"Cache-Control": "no-cache"
			}
		});

		res.json(response.data);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
});

app.get("/send_kakao_agree/name/:name/phoneNum/:phoneNum/title/:title/state/:state", async (req, res) => {
	const {name, phoneNum, title, state} = req.params;
	try {
		const apiUrl = "https://directsend.co.kr/index.php/api_v2/kakao_notice";
		const response = await axios.post(apiUrl, {
			username        : USERNAME,
			key             : API_KEY,
			type            : "node",
			kakao_plus_id   : KAKAO_PLUS_ID,
			user_template_no: 47,
			receiver        : [
				{"name"    : name,
					"mobile": phoneNum,
					"note1" : "[" + title + "]",
					"note2" : state,
					"note3" : "https://seouliredsm.netlify.app/total"
				},
			]
		}, {
			headers: {
				"Content-Type" : "application/json;charset=utf-8",
				"Accept"       : "application/json",
				"Cache-Control": "no-cache"
			}
		});

		res.json(response.data);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
