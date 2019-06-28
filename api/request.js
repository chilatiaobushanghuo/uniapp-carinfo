const host = 'https://api.it120.cc/360mall'

export default {
	post: (url, data, error, option) => {
		url = host + url;
		return uni.request({
			url: url,
			method: 'post',
			data: data,
			header: option,
		});
	},
	get: (url, error, option) => {
		url = host + url;
		return uni.request({
			url: url,
			method: 'GET',
			data: option
		});
	}
}

function getRealUrl(url) {

	// #ifndef H5
	var viurl = url.split('/');
	switch (viurl[1]) {
		case "source":
			return "http://60.205.57.44:8082/api" + url.replace('/source', '');
		case "cmsapi":
			return "http://60.205.57.44:8089/api" + url.replace('/cmsapi', '');
		case "api":
			return "http://60.205.57.44:8081" + url;
	}
	// #endif
	return url;
}
