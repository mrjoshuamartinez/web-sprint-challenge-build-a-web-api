const server = require('./api/server');

const port = process.env.PORT || 1116

server.use((err, req, res) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong, Please check back later and try again.",
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
