var config = {
	locale: process.env.LOCALE,

	port: process.env.PORT,

	db: {
		connection: process.env.MONGO_URL,
		aliases: {
			user: 'users'
		}
	},

	accessToken: process.env.ACCESS_TOKEN,

	logentries: {
		token: process.env.LOGENTRIES_TOKEN
	},

	hook: {
		url: process.env.HOOK_URL,
		token: process.env.HOOK_TOKEN
	},

	from: {
		name: process.env.FROM_NAME,
		address: process.env.FROM_EMAIL
	},

	transport: {
		nodemailer: {
			service: process.env.NODEMAILER_SERVICE,
			user: process.env.NODEMAILER_USER,
			pass: process.env.NODEMAILER_PASS
		},
		twilio : {
			accountSid: process.env.TWILIO_ACCOUNT_SID,
			authToken: process.env.TWILIO_ACCOUNT_TOKEN
		},
		gcm : {
			serverApiKey: process.env.GOOGLE_SERVER_API_KEY
		},
		apn : {
			cert: process.env.APPLE_CERT,
			key: process.env.APPLE_KEY
		}
	},

	jobs: {
		run: {
			resolve: 5,
			execute: 10
		},

		collection: 'notifierJobs'
	}
};

module.exports = config;