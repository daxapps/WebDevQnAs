exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL || 
                       "mongodb://dax:password@ds123722.mlab.com:23722/webdevqna"



exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
						'mongodb://localhost/test';  

exports.PORT = process.env.PORT || 8080;