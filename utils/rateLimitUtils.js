const getRateLimitHeaders = (req) => {
	return {
		"X-RateLimit-Limit": req.rateLimit.limit,
		"X-RateLimit-Remaining": req.rateLimit.remaining,
		"X-RateLimit-Reset": Math.ceil(req.rateLimit.resetTime / 1000),
	};
};

export default getRateLimitHeaders;
