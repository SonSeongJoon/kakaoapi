const https = require('https');
const querystring = require('querystring');

// 카카오 API 정보와 수신자 정보를 포함한 데이터 정의
const data = {
	username: 'seoulir07',
	key: 'JAiY0S3262X8W94',
	kakao_plus_id: '@seoulir07',
	user_template_no: '20',
	receiver: JSON.stringify([
		{
			name: '손성준',
			mobile: '01028184783',
			note1: '다이렉트센드 1',
			note2: '다이렉트센드 2',
			note3: '다이렉트센드 3',
			note4: '다이렉트센드 4',
		}
		// 다른 수신자 정보도 여기에 추가하세요.
	])
};

// HTTP 요청 옵션 정의
const options = {
	hostname: 'directsend.co.kr',
	path: '/index.php/api_v2/kakao_notice',
	method: 'POST',
	port: 5000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Accept': 'application/json'
	}
};

// HTTP 요청 보내기
const req = https.request(options, (res) => {
	let data = '';

	// 응답 데이터를 문자열로 합치기
	res.on('data', (chunk) => {
		data += chunk;
	});

	// 응답이 종료되면 로그 출력
	res.on('end', () => {
		console.log('Response:', data);
	});
});

// 오류 처리
req.on('error', (e) => {
	console.error('Error:', e.message);
});

// 데이터를 JSON 문자열로 변환하고 요청 본문에 포함
req.write(JSON.stringify(data));

// 요청 종료
req.end();
